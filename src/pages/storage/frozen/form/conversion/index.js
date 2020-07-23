import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Table, Input, Select, Form, Button, notification } from 'antd'
import './style.module.css'

const { Option } = Select

const mapStateToProps = ({ storage }) => ({
  conversionId: storage.conversionId,
  frozenItemStock: storage.frozenItemStock,
})

const mapDispatchToProps = dispatch => {
  return {
    generateConversionId: () => {
      dispatch({
        type: 'storage/GENERATE_CONVERSION_ID',
      })
    },
    getFrozenItemStock: () => {
      dispatch({
        type: 'storage/GET_FROZEN_ITEM_STOCK',
      })
    },
    processItemConversion: payload => {
      dispatch({
        type: 'storage/PROCESS_ITEM_CONVERSION',
        payload,
      })
    },
    setFrozenItemStock: frozenItemStock => {
      dispatch({
        type: 'storage/SET_STATE',
        payload: {
          frozenItemStock,
        },
      })
    },
  }
}

class ProcessConversion extends React.Component {
  state = {
    conversionItemDetails: null,
    inputItemSelectOption: null,
    outputItemSelectOption: null,
    quantityWeightMeasurementUnit: null,
    quantityVolumeMeasurementUnit: null,
  }

  formRefInput = React.createRef()

  componentDidMount() {
    const { generateConversionId, getFrozenItemStock } = this.props
    generateConversionId()
    getFrozenItemStock()
  }

  onInputItemChange = event => {
    const { frozenItemStock } = this.props
    let quantityVolumeMeasurementUnit = ''
    let quantityWeightMeasurementUnit = ''

    this.formRefInput.current.setFieldsValue({
      outputItemName: undefined,
    })

    const item = frozenItemStock.filter(data => {
      return data.item_name === event
    })

    // Populate Input item list
    const outputItemData = frozenItemStock.filter(data => {
      return data.group === 'whole' && data.type === 'main' && data.item_name !== event
    })
    const outputItemSelectOption = outputItemData.map(o => (
      <Option value={o.item_name} key={o.item_name}>
        FROZEN {o.item_name}
      </Option>
    ))

    quantityWeightMeasurementUnit = `kg | Stok : ${item[0].quantity_weight}`
    quantityVolumeMeasurementUnit = `Ekor | Stok : ${item[0].quantity_volume}`

    this.setState({
      outputItemSelectOption,
      quantityWeightMeasurementUnit,
      quantityVolumeMeasurementUnit,
    })
  }

  onFinish = values => {
    const { frozenItemStock, setFrozenItemStock } = this.props
    let { conversionItemDetails } = this.state

    this.setState({
      conversionItemDetails: [],
    })

    let keyId = 1
    if (conversionItemDetails === null) {
      conversionItemDetails = []
    } else if (conversionItemDetails.length > 0) {
      keyId = conversionItemDetails[conversionItemDetails.length - 1].key + 1
    }

    conversionItemDetails.push({
      key: keyId,
      inputItemName: values.inputItemName,
      outputItemName: values.outputItemName,
      quantityWeight: values.quantityWeight,
      quantityVolume: values.quantityVolume,
    })

    const updatedFrozenItemStock = this.updateFrozenItemStockQuantity(
      frozenItemStock,
      values.inputItemName,
      values.quantityWeight,
      values.quantityVolume,
    )

    setFrozenItemStock(updatedFrozenItemStock)

    this.setState({
      conversionItemDetails,
      quantityWeightMeasurementUnit: 'kg',
      quantityVolumeMeasurementUnit: 'Ekor',
    })

    this.formRefInput.current.setFieldsValue({
      inputItemName: undefined,
      outputItemName: undefined,
      quantityWeight: undefined,
      quantityVolume: undefined,
    })
  }

  onButtonAddClick = () => {
    const { conversionId } = this.props
    const { conversionItemDetails } = this.state

    if (conversionItemDetails === null || conversionItemDetails.length < 1) {
      notification.error({
        message: 'Silahkan pilih item yang ingin di konversi',
      })
      return
    }

    const payload = {
      conversionId,
      storageSource: 'frozen',
      items: conversionItemDetails,
    }

    const { processItemConversion } = this.props

    // send data to backend
    processItemConversion(payload)
  }

  updateFrozenItemStockQuantity = (itemStock, itemName, quantityWeight, quantityVolume) => {
    return itemStock.map(item => {
      const temp = Object.assign({}, item)
      if (temp.item_name === itemName) {
        temp.quantity_weight -= quantityWeight
        temp.quantity_volume -= quantityVolume
      }
      return temp
    })
  }

  render() {
    const columns = [
      {
        title: 'Nama Item Asal',
        width: 100,
        dataIndex: 'inputItemName',
        key: 'inputItemName',
      },
      {
        title: 'Nama Item Hasil',
        width: 100,
        dataIndex: 'outputItemName',
        key: 'outputItemName',
      },
      {
        title: 'Qty (kg)',
        width: 100,
        dataIndex: 'quantityWeight',
        key: 'quantityWeight',
      },
      {
        title: 'Qty (Ekor/Pax)',
        width: 100,
        dataIndex: 'quantityVolume',
        key: 'quantityVolume',
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

    const { conversionId, frozenItemStock } = this.props

    const fullDate = new Date()
    const today = fullDate.toLocaleDateString('en-US')
    const isInputDisabled = true

    let {
      conversionItemDetails,
      inputItemSelectOption,
      outputItemSelectOption,
      quantityWeightMeasurementUnit,
      quantityVolumeMeasurementUnit,
    } = this.state

    quantityWeightMeasurementUnit = quantityWeightMeasurementUnit || 'kg'
    quantityVolumeMeasurementUnit = quantityVolumeMeasurementUnit || 'Ekor'

    inputItemSelectOption = inputItemSelectOption || []
    outputItemSelectOption = outputItemSelectOption || []
    conversionItemDetails = conversionItemDetails || []

    if (frozenItemStock.length > 0) {
      const inputItemData = frozenItemStock.filter(data => {
        return (
          data.group === 'whole' &&
          data.type === 'main' &&
          data.quantity_volume > 0 &&
          data.quantity_weight > 0
        )
      })

      // Populate Input item list
      inputItemSelectOption = inputItemData.map(o => (
        <Option value={o.item_name} key={o.item_name}>
          FROZEN {o.item_name}
        </Option>
      ))
    }

    return (
      <div>
        <Helmet title="Process / conversion" />
        <div className="kit__utils__heading">
          <h5>Proses Konversi</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <Form
              {...formItemLayout}
              ref={this.formRefInput}
              labelAlign="left"
              onFinish={this.onFinish}
            >
              <Form.Item name="conversionId" label="Kode konversi">
                <Input placeholder={conversionId} disabled={isInputDisabled} />
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
                name="quantityWeight"
                label="Quantity"
                rules={[{ required: true, message: 'Quantity harus diisi' }]}
              >
                <Input
                  type="number"
                  placeholder="Masukkan quantity"
                  addonAfter={quantityWeightMeasurementUnit}
                />
              </Form.Item>
              <Form.Item
                name="quantityVolume"
                label="Quantity"
                rules={[{ required: true, message: 'Quantity harus diisi' }]}
              >
                <Input
                  type="number"
                  placeholder="Masukkan quantity"
                  addonAfter={quantityVolumeMeasurementUnit}
                />
              </Form.Item>
              <div className="kit__utils__heading">
                <h5>Hasil Konversi</h5>
              </div>
              <Form.Item
                id="outputItemName"
                name="outputItemName"
                label="Nama Item"
                rules={[{ required: true, message: 'Item harus dipilih' }]}
              >
                <Select placeholder="Pilih item">{outputItemSelectOption}</Select>
              </Form.Item>
              <button type="submit" className="btn btn-success">
                Tambah Hasil Konversi
              </button>
              <div>
                <br />
              </div>
              <div className="mb-4 kit__utils__scrollTable">
                <Table columns={columns} dataSource={conversionItemDetails} />
              </div>
            </Form>
            <div className="border-top text-dark font-size-18 pt-4">
              <Link to="/storage/frozen" className="kit__utils__link font-size-16">
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

export default connect(mapStateToProps, mapDispatchToProps)(ProcessConversion)
