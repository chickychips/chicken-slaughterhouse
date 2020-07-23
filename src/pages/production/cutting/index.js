import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Table, Input, Select, Form, Button, notification } from 'antd'
import './style.module.css'

const { Option } = Select

const mapStateToProps = ({ cutting }) => ({
  newCuttingId: cutting.newCuttingId,
  cuttingData: cutting.cuttingData,
})

const mapDispatchToProps = dispatch => {
  return {
    generateCuttingId: () => {
      dispatch({
        type: 'cutting/GENERATE_CUTTING_ID',
      })
    },
    getCuttingData: () => {
      dispatch({
        type: 'cutting/GET_DATA',
      })
    },
    processCutting: payload => {
      dispatch({
        type: 'cutting/PROCESS_CUTTING',
        payload,
      })
    },
  }
}

class ProcessCutting extends React.Component {
  state = {
    productionIdSelectOption: null,
    formProductionIdHideToggle: null,
    outputItemSelectOption: null,
    inputItemSelectOption: null,
    outputItemList: null,
    inputQuantityVolumeMeasurementUnit: null,
    outputQuantityVolumeMeasurementUnit: null,
    isInputQuantityWeightDisabled: null,
    isInputQuantityVolumeDisabled: null,
  }

  formRefInput = React.createRef()

  formRefOutput = React.createRef()

  componentDidMount() {
    const { generateCuttingId, getCuttingData } = this.props
    generateCuttingId()
    getCuttingData()
  }

  onItemSourceChange = event => {
    const { cuttingData } = this.props

    this.formRefOutput.current.setFieldsValue({
      outputItemName: undefined,
      quantityWeight: undefined,
      quantityVolume: undefined,
    })

    this.formRefInput.current.setFieldsValue({
      productionId: undefined,
      inputQuantityWeight: undefined,
      inputQuantityVolume: undefined,
      itemName: undefined,
    })

    if (event === 'production') {
      const inputDataBuffer = cuttingData.supplyList.map(o => (
        <Option value={o.production_id} key={o.production_id}>
          {o.production_id}
        </Option>
      ))

      this.setState({
        formProductionIdHideToggle: false,
        productionIdSelectOption: inputDataBuffer,
        inputItemSelectOption: [],
        outputItemList: [],
        outputItemSelectOption: [],
        outputQuantityVolumeMeasurementUnit: 'Ekor',
        isInputQuantityWeightDisabled: true,
        isInputQuantityVolumeDisabled: true,
      })
    } else {
      this.setState({
        formProductionIdHideToggle: true,
        outputItemList: [],
        outputItemSelectOption: [],
      })

      const inputItemNameList = cuttingData.stockList.filter(data => {
        return data.group === 'whole' && data.is_input === true
      })

      const inputItemDataBuffer = inputItemNameList.map(o => (
        <Option value={o.item_name} key={o.item_name}>
          {o.item_name}
        </Option>
      ))

      this.setState({
        inputItemSelectOption: inputItemDataBuffer,
        outputQuantityVolumeMeasurementUnit: 'Pax',
        isInputQuantityWeightDisabled: false,
        isInputQuantityVolumeDisabled: false,
      })
    }
  }

  onProductionIdChange = event => {
    const { cuttingData } = this.props

    const outputItemNameList = cuttingData.itemList.filter(data => {
      return data.group === 'whole'
    })

    const outputItemDataBuffer = outputItemNameList.map(o => (
      <Option value={o.name} key={o.name}>
        {o.name}
      </Option>
    ))

    this.setState({
      inputItemSelectOption: [],
      outputItemSelectOption: outputItemDataBuffer,
      outputItemList: [],
    })

    const inputItemList = cuttingData.supplyList.filter(data => {
      return data.production_id === event
    })

    const inputItemDataBuffer = inputItemList.map(o => (
      <Option value={o.item_name} key={o.item_name}>
        {o.item_name}
      </Option>
    ))

    this.formRefInput.current.setFieldsValue({
      itemName: inputItemList[0].item_name,
      inputQuantityWeight: inputItemList[0].quantity_weight,
      inputQuantityVolume: inputItemList[0].quantity_volume,
    })

    this.formRefOutput.current.setFieldsValue({
      outputItemName: undefined,
      quantityWeight: undefined,
      quantityVolume: undefined,
    })

    this.setState({
      inputItemSelectOption: inputItemDataBuffer,
    })
  }

  onInputItemChange = event => {
    const { cuttingData } = this.props
    let inputQuantityVolumeMeasurementUnit = 'Ekor'

    const inputItemList = cuttingData.stockList.filter(data => {
      return data.item_name === event
    })
    console.log('inputitem list', inputItemList)
    let itemGroup = 'whole'

    if (inputItemList[0].group === 'whole') {
      inputQuantityVolumeMeasurementUnit =
        inputItemList[0].type === 'main' ? inputQuantityVolumeMeasurementUnit : 'Pax'
      itemGroup = 'pieces'

      this.formRefInput.current.setFieldsValue({
        inputQuantityWeight: inputItemList[0].quantity_weight,
        inputQuantityVolume: inputItemList[0].quantity_volume,
      })
    }

    const outputItemNameList = cuttingData.itemList.filter(data => {
      return data.group === itemGroup
    })

    const outputItemDataBuffer = outputItemNameList.map(o => (
      <Option value={o.name} key={o.name}>
        {o.name}
      </Option>
    ))

    this.setState({
      outputItemSelectOption: outputItemDataBuffer,
      outputItemList: [],
      inputQuantityVolumeMeasurementUnit,
    })

    this.formRefOutput.current.setFieldsValue({
      outputItemName: undefined,
      quantityWeight: undefined,
      quantityVolume: undefined,
    })
  }

  onOutputItemChange = event => {
    const { cuttingData } = this.props
    let { outputQuantityVolumeMeasurementUnit } = this.state

    const outputItemData = cuttingData.itemList.filter(data => {
      return data.name === event
    })

    if (outputItemData[0].group === 'whole') {
      outputQuantityVolumeMeasurementUnit =
        outputItemData[0].type === 'main' ? 'Ekor' : outputQuantityVolumeMeasurementUnit
    }

    this.formRefOutput.current.setFieldsValue({
      quantityWeight: undefined,
      quantityVolume: undefined,
    })

    this.setState({
      outputQuantityVolumeMeasurementUnit,
    })
  }

  onButtonAddClick = () => {
    const { newCuttingId } = this.props

    const { outputItemList } = this.state

    if (outputItemList === null || outputItemList.length < 1) {
      notification.error({
        message: 'Please fill required data',
      })
      return
    }

    const {
      itemName,
      inputQuantityWeight,
      inputQuantityVolume,
    } = this.formRefInput.current.getFieldsValue()
    let { productionId } = this.formRefInput.current.getFieldsValue()
    productionId = productionId === undefined ? '' : productionId

    const payload = {
      cuttingId: newCuttingId,
      itemInput: itemName,
      inputQuantityWeight,
      inputQuantityVolume,
      itemOutput: outputItemList,
      referenceId: productionId,
    }

    const { processCutting } = this.props

    // send cutting data to backend
    processCutting(payload)
  }

  onFinish = values => {
    let { outputItemList } = this.state
    this.setState({
      outputItemList: [],
    })
    let keyId = 1
    if (outputItemList === null) {
      outputItemList = []
    } else if (outputItemList.length > 0) {
      keyId = outputItemList[outputItemList.length - 1].key + 1
    }
    outputItemList.push({
      key: keyId,
      name: values.outputItemName,
      quantityWeight: values.quantityWeight,
      quantityVolume: values.quantityVolume,
    })

    this.setState({
      outputItemList,
    })

    this.formRefOutput.current.setFieldsValue({
      outputItemName: undefined,
      quantityWeight: undefined,
      quantityVolume: undefined,
    })
  }

  render() {
    const columns = [
      {
        title: 'Nama Item',
        width: 100,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Quantity (kg)',
        width: 100,
        dataIndex: 'quantityWeight',
        key: 'quantityWeight',
      },
      {
        title: 'Quantity (Ekor / Pax)',
        width: 100,
        dataIndex: 'quantityVolume',
        key: 'quantityVolume',
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 60,
        render: () => <a>Delete</a>,
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

    const { newCuttingId, cuttingData } = this.props

    const fullDate = new Date()
    const today = fullDate.toLocaleDateString('en-US')
    const isInputDisabled = true

    if (Object.keys(cuttingData).length > 0) {
      const result = cuttingData.itemList.filter(data => {
        return data.group === 'whole'
      })
      // console.log('cutting', cuttingData.supplyList[0].production_id);
      console.log('itemList', result)
    }

    let {
      inputItemSelectOption,
      outputItemSelectOption,
      productionIdSelectOption,
      formProductionIdHideToggle,
      outputItemList,
      inputQuantityVolumeMeasurementUnit,
      outputQuantityVolumeMeasurementUnit,
      isInputQuantityWeightDisabled,
      isInputQuantityVolumeDisabled,
    } = this.state
    // Populate Input item list
    inputItemSelectOption = inputItemSelectOption || []

    // Populate Output item list
    outputItemSelectOption = outputItemSelectOption || []

    // Populate Production Id  list
    productionIdSelectOption = productionIdSelectOption || []

    formProductionIdHideToggle =
      formProductionIdHideToggle === null ? true : formProductionIdHideToggle

    isInputQuantityWeightDisabled =
      isInputQuantityWeightDisabled === null ? true : isInputQuantityWeightDisabled
    isInputQuantityVolumeDisabled =
      isInputQuantityVolumeDisabled === null ? true : isInputQuantityVolumeDisabled

    outputItemList = outputItemList || []

    inputQuantityVolumeMeasurementUnit = inputQuantityVolumeMeasurementUnit || 'Ekor'
    outputQuantityVolumeMeasurementUnit = outputQuantityVolumeMeasurementUnit || 'Ekor'

    return (
      <div>
        <Helmet title="Input / Pengajuan" />
        <div className="kit__utils__heading">
          <h5>Input pengajuan</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <Form {...formItemLayout} ref={this.formRefInput} labelAlign="left">
              <Form.Item name="cuttingId" label="Kode Cutting">
                <Input placeholder={newCuttingId} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item name="dateToday" label="Tanggal">
                <Input placeholder={today} disabled={isInputDisabled} />
              </Form.Item>
              <div className="kit__utils__heading">
                <h5>Asal Item Produksi</h5>
              </div>
              <Form.Item
                id="itemSource"
                name="itemSource"
                label="Asal Item"
                rules={[{ required: true, message: 'Asal Item harus dipilih' }]}
              >
                <Select onChange={this.onItemSourceChange} placeholder="Pilih asal item">
                  <Option value="production" key="production">
                    Pengajuan
                  </Option>
                  <Option value="freshWarehouse" key="freshWarehouse">
                    Gudang fresh
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                id="productionId"
                name="productionId"
                label="Kode produksi"
                rules={[{ required: true, message: 'Item harus dipilih' }]}
                style={formProductionIdHideToggle === true ? { display: 'none' } : { display: '' }}
              >
                <Select onChange={this.onProductionIdChange} placeholder="Pilih Kode Produksi">
                  {productionIdSelectOption}
                </Select>
              </Form.Item>
              <Form.Item
                id="itemName"
                name="itemName"
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
            </Form>
            <Form
              {...formItemLayout}
              ref={this.formRefOutput}
              labelAlign="left"
              onFinish={this.onFinish}
            >
              <div className="kit__utils__heading">
                <h5>Hasil Produksi</h5>
              </div>
              <Form.Item
                id="outputItemName"
                name="outputItemName"
                label="Nama Item"
                rules={[{ required: true, message: 'Item harus dipilih' }]}
              >
                <Select onChange={this.onOutputItemChange} placeholder="Pilih item">
                  {outputItemSelectOption}
                </Select>
              </Form.Item>
              <Form.Item
                name="quantityWeight"
                label="Quantity"
                rules={[{ required: true, message: 'Quantity harus diisi' }]}
              >
                <Input type="number" placeholder="Masukkan quantity" addonAfter="kg" />
              </Form.Item>
              <Form.Item
                name="quantityVolume"
                label="Quantity"
                rules={[{ required: true, message: 'Quantity harus diisi' }]}
              >
                <Input
                  type="number"
                  placeholder="Masukkan quantity"
                  addonAfter={outputQuantityVolumeMeasurementUnit}
                />
              </Form.Item>
              <button type="submit" className="btn btn-success">
                Tambah Hasil Produksi
              </button>
              <div>
                <br />
              </div>
              <div className="mb-4 kit__utils__scrollTable">
                <Table columns={columns} dataSource={outputItemList} scroll={{ x: 1500, y: 300 }} />
              </div>
            </Form>
            <Link to="/" className="kit__utils__link font-size-16">
              <i className="fe fe-arrow-left mr-1 align-middle" />
              Kembali
            </Link>
            <Button
              onClick={this.onButtonAddClick}
              className="float-right"
              style={{ backgroundColor: '#55c392' }}
            >
              Proses
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCutting)
