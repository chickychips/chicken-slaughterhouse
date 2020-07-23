import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Table, Input, Select, Form, Button, notification } from 'antd'
import './style.module.css'

const { Option } = Select

const mapStateToProps = ({ freeze }) => ({
  newFreezeId: freeze.newFreezeId,
  freezeData: freeze.freezeData,
})

const mapDispatchToProps = dispatch => {
  return {
    generateFreezeId: () => {
      dispatch({
        type: 'freeze/GENERATE_FREEZE_ID',
      })
    },
    getFreezeData: () => {
      dispatch({
        type: 'freeze/GET_DATA',
      })
    },
    processFreeze: payload => {
      dispatch({
        type: 'freeze/PROCESS_FREEZE',
        payload,
      })
    },
  }
}

class ProcessFreeze extends React.Component {
  state = {
    totalQuantityWeight: null,
    totalQuantityVolume: null,
    freezeDataDetails: null,
    inputItemSelectOption: null,
    outputItemName: null,
    inputQuantityVolumeMeasurementUnit: null,
  }

  formRefInput = React.createRef()

  componentDidMount() {
    const { generateFreezeId, getFreezeData } = this.props
    generateFreezeId()
    getFreezeData()
  }

  onInputItemChange = event => {
    const { freezeData } = this.props
    let inputQuantityVolumeMeasurementUnit = 'Ekor'

    const inputItemList = freezeData.filter(data => {
      return data.item_name === event
    })

    if (inputItemList[0].group === 'whole') {
      inputQuantityVolumeMeasurementUnit =
        inputItemList[0].type === 'main' ? inputQuantityVolumeMeasurementUnit : 'Pax'
    }

    this.formRefInput.current.setFieldsValue({
      inputQuantityWeight: inputItemList[0].quantity_weight,
      inputQuantityVolume: inputItemList[0].quantity_volume,
    })

    this.setState({
      inputQuantityVolumeMeasurementUnit,
      outputItemName: `FROZEN ${event}`,
    })
  }

  onFinish = values => {
    let { freezeDataDetails, totalQuantityWeight, totalQuantityVolume } = this.state

    this.setState({
      freezeDataDetails: [],
    })

    let keyId = 1
    if (freezeDataDetails === null) {
      freezeDataDetails = []
    } else if (freezeDataDetails.length > 0) {
      keyId = freezeDataDetails[freezeDataDetails.length - 1].key + 1
    }

    freezeDataDetails.push({
      key: keyId,
      item_name: values.inputItemName,
      item_name_fresh: `FRESH ${values.inputItemName}`,
      input_quantity_weight: values.inputQuantityWeight,
      input_quantity_volume: values.inputQuantityVolume,
      output_quantity_weight: values.outputQuantityWeight,
      output_quantity_volume: values.outputQuantityVolume,
    })

    // Calculate the total quantity of all item
    totalQuantityWeight += parseInt(values.outputQuantityWeight, 10)
    totalQuantityVolume += parseInt(values.outputQuantityVolume, 10)

    this.setState({
      freezeDataDetails,
      totalQuantityWeight,
      totalQuantityVolume,
    })

    this.formRefInput.current.setFieldsValue({
      inputItemName: undefined,
      inputQuantityWeight: undefined,
      inputQuantityVolume: undefined,
      outputItemName: undefined,
      outputQuantityWeight: undefined,
      outputQuantityVolume: undefined,
    })
  }

  onButtonAddClick = () => {
    const { newFreezeId } = this.props
    const { freezeDataDetails } = this.state

    if (freezeDataDetails === null || freezeDataDetails.length < 1) {
      notification.error({
        message: 'Silahkan pilih item yang ingin di freeze',
      })
      return
    }

    const payload = {
      freezeId: newFreezeId,
      items: freezeDataDetails,
    }

    const { processFreeze } = this.props

    // send data to backend
    processFreeze(payload)
  }

  render() {
    const columns = [
      {
        title: 'Nama Item',
        width: 100,
        dataIndex: 'item_name_fresh',
        key: 'item_name_fresh',
      },
      {
        title: 'Qty (kg)',
        width: 100,
        dataIndex: 'output_quantity_weight',
        key: 'output_quantity_weight',
      },
      {
        title: 'Qty (Ekor/Pax)',
        width: 100,
        dataIndex: 'output_quantity_volume',
        key: 'output_quantity_volume',
      },
    ]

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    }

    const { newFreezeId, freezeData } = this.props

    const fullDate = new Date()
    const today = fullDate.toLocaleDateString('en-US')
    const isInputDisabled = true

    let {
      totalQuantityWeight,
      totalQuantityVolume,
      freezeDataDetails,
      inputItemSelectOption,
      outputItemName,
      inputQuantityVolumeMeasurementUnit,
    } = this.state

    inputItemSelectOption = inputItemSelectOption || []
    freezeDataDetails = freezeDataDetails || []
    totalQuantityWeight = totalQuantityWeight || 0
    totalQuantityVolume = totalQuantityVolume || 0
    outputItemName = outputItemName || ''
    inputQuantityVolumeMeasurementUnit = inputQuantityVolumeMeasurementUnit || 'Ekor'

    if (freezeData.length > 0) {
      // Populate Input item list
      inputItemSelectOption = freezeData.map(o => (
        <Option value={o.item_name} key={o.item_name}>
          FRESH {o.item_name}
        </Option>
      ))
    }

    return (
      <div>
        <Helmet title="Process / freeze" />
        <div className="kit__utils__heading">
          <h5>Proses Freeze</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <Form
              {...formItemLayout}
              ref={this.formRefInput}
              labelAlign="left"
              onFinish={this.onFinish}
            >
              <Form.Item name="newFreezeId" label="Kode freeze">
                <Input placeholder={newFreezeId} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item name="dateToday" label="Tanggal">
                <Input placeholder={today} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item
                id="inputItemName"
                name="inputItemName"
                label="Nama Item"
                rules={[{ required: true, message: 'Item harus dipilih' }]}
              >
                <Select onChange={this.onInputItemChange} placeholder="Pilih item">
                  {inputItemSelectOption}
                </Select>
              </Form.Item>
              <Form.Item
                name="inputQuantityWeight"
                label="Quantity"
                rules={[{ required: true, message: 'Quantity harus diisi' }]}
              >
                <Input type="number" placeholder="Masukkan quantity" addonAfter="kg" />
              </Form.Item>
              <Form.Item
                name="inputQuantityVolume"
                label="Quantity"
                rules={[{ required: true, message: 'Quantity harus diisi' }]}
              >
                <Input
                  type="number"
                  placeholder="Masukkan quantity"
                  addonAfter={inputQuantityVolumeMeasurementUnit}
                />
              </Form.Item>
              <div className="kit__utils__heading">
                <h5>Hasil Freeze</h5>
              </div>
              <Form.Item name="outputItemName" label="Item hasil">
                <Input placeholder={outputItemName} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item
                name="outputQuantityWeight"
                label="Quantity"
                rules={[{ required: true, message: 'Quantity harus diisi' }]}
              >
                <Input type="number" placeholder="Masukkan quantity" addonAfter="kg" />
              </Form.Item>
              <Form.Item
                name="outputQuantityVolume"
                label="Quantity"
                rules={[{ required: true, message: 'Quantity harus diisi' }]}
              >
                <Input
                  type="number"
                  placeholder="Masukkan quantity"
                  addonAfter={inputQuantityVolumeMeasurementUnit}
                />
              </Form.Item>
              <button type="submit" className="btn btn-success">
                Tambah Hasil Freeze
              </button>
              <div>
                <br />
              </div>
              <div className="mb-4 kit__utils__scrollTable">
                <Table columns={columns} dataSource={freezeDataDetails} />
              </div>
            </Form>
            <div className="border-top text-dark font-size-18 pt-4">
              <p className="mb-1 text-right">
                Total Qty (kg): <strong className="font-size-24">{totalQuantityWeight}</strong>
              </p>
              <p className="mb-1 text-right">
                Total Qty (Ekor/Pax):{' '}
                <strong className="font-size-24">{totalQuantityVolume}</strong>
              </p>
              <Link to="/" className="kit__utils__link font-size-16">
                <i className="fe fe-arrow-left mr-1 align-middle" />
                Kembali
              </Link>
              <Button
                onClick={this.onButtonAddClick}
                className="btn btn-lg btn-success width-200 mb-2 float-right"
              >
                Proses
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessFreeze)
