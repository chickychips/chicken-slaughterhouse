import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Table, Input, Select, Form, Button, notification } from 'antd'
import './style.module.css'

const { Option } = Select

const mapStateToProps = ({ thawing }) => ({
  newThawingId: thawing.newThawingId,
  thawingData: thawing.thawingData,
})

const mapDispatchToProps = dispatch => {
  return {
    generateThawingId: () => {
      dispatch({
        type: 'thawing/GENERATE_THAWING_ID',
      })
    },
    getPendingTransaction: () => {
      dispatch({
        type: 'thawing/GET_DATA',
      })
    },
    processThawing: payload => {
      dispatch({
        type: 'thawing/PROCESS_THAWING',
        payload,
      })
    },
  }
}

class ProcessThawing extends React.Component {
  state = {
    transactionIdSelectOption: null,
    thawingDataDetails: null,
    filteredThawingData: [],
    totalQuantityWeight: null,
    totalQuantityVolume: null,
    customer: null,
    formTransactionIdHideToggle: null,
    inputItemSelectOption: null,
    outputItemName: null,
    inputQuantityVolumeMeasurementUnit: null,
    isInputQuantityWeightDisabled: null,
    isInputQuantityVolumeDisabled: null,
  }

  formRefInput = React.createRef()

  componentDidMount() {
    const { generateThawingId, getPendingTransaction } = this.props
    generateThawingId()
    getPendingTransaction()
  }

  onItemSourceChange = event => {
    const { thawingData } = this.props

    this.formRefInput.current.setFieldsValue({
      transactionId: undefined,
      inputItemName: undefined,
      inputQuantityWeight: undefined,
      inputQuantityVolume: undefined,
      outputQuantityWeight: undefined,
      outputQuantityVolume: undefined,
    })

    if (event === 'transaction') {
      this.setState({
        inputItemSelectOption: [],
        formTransactionIdHideToggle: false,
        outputItemName: undefined,
        thawingDataDetails: [],
        isInputQuantityVolumeDisabled: true,
        isInputQuantityWeightDisabled: true,
      })
    } else {
      // Populate Input item list
      const inputItemSelectOption = thawingData.stockFrozenData.map(o => (
        <Option value={o.item_name} key={o.item_name}>
          FROZEN {o.item_name}
        </Option>
      ))

      this.formRefInput.current.setFieldsValue({
        transactionId: undefined,
      })
      this.setState({
        inputItemSelectOption,
        formTransactionIdHideToggle: true,
        outputItemName: undefined,
        thawingDataDetails: [],
        isInputQuantityVolumeDisabled: false,
        isInputQuantityWeightDisabled: false,
      })
    }
  }

  onTransactionIdChange = event => {
    const { thawingData } = this.props
    let totalQuantityWeight = 0
    let totalQuantityVolume = 0
    let filteredThawingData = []
    let thawingDataDetails = []

    this.setState({
      thawingDataDetails,
      totalQuantityWeight,
      totalQuantityVolume,
      filteredThawingData,
    })

    thawingDataDetails = thawingData.thawingData.filter(data => {
      return data.reference_id === event
    })

    // Populate Input item list
    const inputItemSelectOption = thawingDataDetails.map(o => (
      <Option value={o.item_name} key={o.item_name}>
        FROZEN {o.item_name}
      </Option>
    ))

    thawingDataDetails.forEach((item, i) => {
      // Add key to each index so it will be unique
      item.key = i + 1

      // add frozen in front of item name
      item.item_name_frozen = `FROZEN ${item.item_name}`

      // Calculate the total quantity of all item
      totalQuantityWeight += parseInt(item.quantity_weight, 10)
      totalQuantityVolume += parseInt(item.quantity_volume, 10)
    })

    filteredThawingData = thawingDataDetails

    this.formRefInput.current.setFieldsValue({
      customer: thawingDataDetails[0].customer,
    })

    this.setState({
      inputItemSelectOption,
      totalQuantityWeight,
      totalQuantityVolume,
      filteredThawingData,
    })
  }

  onInputItemChange = event => {
    const { thawingData } = this.props
    const { filteredThawingData } = this.state
    let inputQuantityVolumeMeasurementUnit = 'Ekor'

    const { itemSource } = this.formRefInput.current.getFieldsValue()

    let inputItemList = []
    if (itemSource !== 'transaction') {
      inputItemList = thawingData.stockFrozenData.filter(data => {
        return data.item_name === event
      })

      if (inputItemList[0].group === 'whole') {
        inputQuantityVolumeMeasurementUnit =
          inputItemList[0].type === 'main' ? inputQuantityVolumeMeasurementUnit : 'Pax'
      }
    } else {
      inputItemList = filteredThawingData.filter(data => {
        return data.item_name === event
      })

      if (inputItemList[0].group === 'whole') {
        inputQuantityVolumeMeasurementUnit =
          inputItemList[0].type === 'main' ? inputQuantityVolumeMeasurementUnit : 'Pax'
      }
    }

    this.formRefInput.current.setFieldsValue({
      inputQuantityWeight: inputItemList[0].quantity_weight,
      inputQuantityVolume: inputItemList[0].quantity_volume,
    })

    this.setState({
      inputQuantityVolumeMeasurementUnit,
      outputItemName: `FRESH ${event}`,
    })
  }

  onFinish = values => {
    let { thawingDataDetails, totalQuantityWeight, totalQuantityVolume } = this.state

    this.setState({
      thawingDataDetails: [],
    })

    let keyId = 1
    if (thawingDataDetails === null) {
      thawingDataDetails = []
    } else if (thawingDataDetails.length > 0) {
      keyId = thawingDataDetails[thawingDataDetails.length - 1].key + 1
    }

    thawingDataDetails.push({
      key: keyId,
      item_name: values.inputItemName,
      item_name_frozen: `FROZEN ${values.inputItemName}`,
      input_quantity_weight: values.inputQuantityWeight,
      input_quantity_volume: values.inputQuantityVolume,
      output_quantity_weight: values.outputQuantityWeight,
      output_quantity_volume: values.outputQuantityVolume,
    })

    // Calculate the total quantity of all item
    totalQuantityWeight += parseInt(values.outputQuantityWeight, 10)
    totalQuantityVolume += parseInt(values.outputQuantityVolume, 10)

    this.setState({
      thawingDataDetails,
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
    const { newThawingId } = this.props

    let { transactionId } = this.formRefInput.current.getFieldsValue()

    const { thawingDataDetails } = this.state

    if (thawingDataDetails === null || thawingDataDetails.length < 1) {
      notification.error({
        message: 'Silahkan pilih kode invoice',
      })
      return
    }

    transactionId = transactionId || ''

    const payload = {
      thawingId: newThawingId,
      referenceId: transactionId,
      items: thawingDataDetails,
    }

    const { processThawing } = this.props

    // send data to backend
    processThawing(payload)
  }

  render() {
    const columns = [
      {
        title: 'Nama Item',
        width: 100,
        dataIndex: 'item_name_frozen',
        key: 'item_name_frozen',
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

    const { newThawingId, thawingData } = this.props

    const fullDate = new Date()
    const today = fullDate.toLocaleDateString('en-US')
    const isInputDisabled = true

    let {
      transactionIdSelectOption,
      customer,
      thawingDataDetails,
      totalQuantityWeight,
      totalQuantityVolume,
      formTransactionIdHideToggle,
      inputItemSelectOption,
      outputItemName,
      inputQuantityVolumeMeasurementUnit,
      isInputQuantityWeightDisabled,
      isInputQuantityVolumeDisabled,
    } = this.state

    transactionIdSelectOption = transactionIdSelectOption || []

    thawingDataDetails = thawingDataDetails || []

    totalQuantityWeight = totalQuantityWeight || 0
    totalQuantityVolume = totalQuantityVolume || 0
    customer = customer || ''
    formTransactionIdHideToggle =
      formTransactionIdHideToggle === null ? true : formTransactionIdHideToggle

    inputItemSelectOption = inputItemSelectOption || []
    outputItemName = outputItemName || ''
    inputQuantityVolumeMeasurementUnit = inputQuantityVolumeMeasurementUnit || 'Ekor'

    isInputQuantityWeightDisabled =
      isInputQuantityWeightDisabled === null ? true : isInputQuantityWeightDisabled
    isInputQuantityVolumeDisabled =
      isInputQuantityVolumeDisabled === null ? true : isInputQuantityVolumeDisabled

    if (Object.keys(thawingData).length > 0) {
      // Populate invoice id list
      transactionIdSelectOption = thawingData.pendingTransactionId.map(o => (
        <Option value={o} key={o}>
          {o}
        </Option>
      ))
    }

    return (
      <div>
        <Helmet title="Process / Thawing" />
        <div className="kit__utils__heading">
          <h5>Proses Thawing</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <Form
              {...formItemLayout}
              ref={this.formRefInput}
              labelAlign="left"
              onFinish={this.onFinish}
            >
              <Form.Item name="newThawingId" label="Kode Thawing">
                <Input placeholder={newThawingId} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item name="dateToday" label="Tanggal">
                <Input placeholder={today} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item
                id="itemSource"
                name="itemSource"
                label="Asal Item"
                rules={[{ required: true, message: 'Asal Item harus dipilih' }]}
              >
                <Select onChange={this.onItemSourceChange} placeholder="Pilih asal item">
                  <Option value="transaction" key="transaction">
                    Invoice Id
                  </Option>
                  <Option value="frozenWarehouse" key="frozenWarehouse">
                    Gudang Frozen
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                id="transactionId"
                name="transactionId"
                label="Kode Invoice"
                style={formTransactionIdHideToggle === true ? { display: 'none' } : { display: '' }}
              >
                <Select onChange={this.onTransactionIdChange} placeholder="Pilih kode invoice">
                  {transactionIdSelectOption}
                </Select>
              </Form.Item>
              <Form.Item
                name="customer"
                label="Pembeli"
                style={formTransactionIdHideToggle === true ? { display: 'none' } : { display: '' }}
              >
                <Input placeholder={customer} disabled={isInputDisabled} />
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
                <Input
                  type="number"
                  disabled={isInputQuantityWeightDisabled}
                  placeholder="Masukkan quantity"
                  addonAfter="kg"
                />
              </Form.Item>
              <Form.Item
                name="inputQuantityVolume"
                label="Quantity"
                rules={[{ required: true, message: 'Quantity harus diisi' }]}
              >
                <Input
                  type="number"
                  disabled={isInputQuantityVolumeDisabled}
                  placeholder="Masukkan quantity"
                  addonAfter={inputQuantityVolumeMeasurementUnit}
                />
              </Form.Item>
              <div className="kit__utils__heading">
                <h5>Hasil Thawing</h5>
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
                Tambah Hasil Thawing
              </button>
              <div>
                <br />
              </div>
              <div className="mb-4 kit__utils__scrollTable">
                <Table columns={columns} dataSource={thawingDataDetails} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProcessThawing)
