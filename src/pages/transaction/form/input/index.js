import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Checkbox, Table, Input, Select, Form, Button, notification } from 'antd'
// import { Table, Input, Select, Form, Button } from 'antd';
import './style.module.css'

const { Option } = Select

const mapStateToProps = ({ transaction }) => ({
  salesOrderId: transaction.salesOrderId,
  transactionData: transaction.transactionData,
})

const mapDispatchToProps = dispatch => {
  return {
    generateSalesOrderId: () => {
      dispatch({
        type: 'transaction/GENERATE_ORDER_ID',
      })
    },
    getTransactionData: () => {
      dispatch({
        type: 'transaction/GET_TRANSACTION_DATA',
      })
    },
    addTransaction: payload => {
      dispatch({
        type: 'transaction/ADD_TRANSACTION',
        payload,
      })
    },
  }
}

class AddTransaction extends React.Component {
  state = {
    itemSelectOption: null,
    orderList: null,
    quantityWeightMeasurementUnit: null,
    quantityVolumeMeasurementUnit: null,
    customerSelectOption: null,
    totalDiscount: null,
    totalPrice: null,
    totalQuantityWeight: null,
    totalQuantityVolume: null,
    thawingOptionHideToggle: null,
  }

  formRefInput = React.createRef()

  componentDidMount() {
    const { generateSalesOrderId, getTransactionData } = this.props
    generateSalesOrderId()
    getTransactionData()
  }

  onItemSourceChange = event => {
    const { transactionData } = this.props

    this.formRefInput.current.setFieldsValue({
      quantityWeight: undefined,
      quantityVolume: undefined,
      itemName: undefined,
      isThawed: false,
    })
    let itemSelectOption = ''
    let thawingOptionHideToggle = true

    if (event === 'freshWarehouse') {
      itemSelectOption = transactionData.stockFresh.map(o => (
        <Option value={o.item_name} key={o.item_name}>
          Fresh {o.item_name}
        </Option>
      ))
    } else {
      thawingOptionHideToggle = false
      itemSelectOption = transactionData.stockFresh.map(o => (
        <Option value={o.item_name} key={o.item_name}>
          Frozen {o.item_name}
        </Option>
      ))
    }

    this.setState({
      thawingOptionHideToggle,
      itemSelectOption,
      quantityWeightMeasurementUnit: 'kg',
      quantityVolumeMeasurementUnit: 'Ekor',
    })
  }

  onItemChange = event => {
    const { transactionData } = this.props
    const { itemSource } = this.formRefInput.current.getFieldsValue()

    let quantityVolumeMeasurementUnit = ''
    let quantityWeightMeasurementUnit = ''

    let item = []
    if (itemSource === 'freshWarehouse') {
      item = transactionData.stockFresh.filter(data => {
        return data.item_name === event
      })
    } else {
      item = transactionData.stockFrozen.filter(data => {
        return data.item_name === event
      })
    }

    quantityWeightMeasurementUnit = `kg | Stok : ${item[0].quantity_weight}`

    if (item[0].group === 'whole') {
      quantityVolumeMeasurementUnit = `${item[0].type === 'main' ? 'Ekor' : 'Pax'} | Stok : ${
        item[0].quantity_volume
      }`
    } else {
      quantityVolumeMeasurementUnit = `Pax | Stok : ${item[0].quantity_volume}`
    }

    this.setState({
      quantityWeightMeasurementUnit,
      quantityVolumeMeasurementUnit,
    })
  }

  onQuantityWeightChange = event => {
    let { unitPrice, discount } = this.formRefInput.current.getFieldsValue()

    if (unitPrice === undefined || unitPrice === '') unitPrice = 0
    if (discount === undefined || discount === '') discount = 0

    const totalPrice = event.target.value * unitPrice - discount
    this.formRefInput.current.setFieldsValue({
      totalPrice,
    })
  }

  onDiscountChange = event => {
    let { unitPrice, quantityWeight } = this.formRefInput.current.getFieldsValue()

    if (unitPrice === undefined || unitPrice === '') unitPrice = 0
    if (quantityWeight === undefined || quantityWeight === '') quantityWeight = 0

    const totalPrice = unitPrice * quantityWeight - event.target.value
    this.formRefInput.current.setFieldsValue({
      totalPrice,
    })
  }

  onUnitPriceChange = event => {
    let { discount, quantityWeight } = this.formRefInput.current.getFieldsValue()

    if (quantityWeight === undefined || quantityWeight === '') quantityWeight = 0
    if (discount === undefined || discount === '') discount = 0

    const totalPrice = event.target.value * quantityWeight - discount
    this.formRefInput.current.setFieldsValue({
      totalPrice,
    })
  }

  onFinish = values => {
    const { itemSource } = this.formRefInput.current.getFieldsValue()

    let {
      orderList,
      totalDiscount,
      totalPrice,
      totalQuantityWeight,
      totalQuantityVolume,
    } = this.state

    this.setState({
      orderList: [],
    })

    let keyId = 1
    if (orderList === null) {
      orderList = []
    } else if (orderList.length > 0) {
      keyId = orderList[orderList.length - 1].key + 1
    }

    values.discount = values.discount || 0

    const itemType = itemSource === 'freshWarehouse' ? 'FRESH' : 'FROZEN'

    orderList.push({
      key: keyId,
      itemType,
      name: values.itemName,
      isFrozen: itemType === 'FROZEN',
      isThawed: values.isThawed,
      isThawedDescription: values.isThawed === true ? 'Iya' : 'Tidak',
      quantityWeight: values.quantityWeight,
      quantityVolume: values.quantityVolume,
      unitPrice: values.unitPrice,
      discount: values.discount,
      totalPrice: values.totalPrice,
    })

    console.log(orderList)

    totalDiscount += parseInt(values.discount, 10)
    totalPrice += parseInt(values.totalPrice, 10)
    totalQuantityWeight += parseInt(values.quantityWeight, 10)
    totalQuantityVolume += parseInt(values.quantityVolume, 10)

    this.setState({
      orderList,
      totalDiscount,
      totalPrice,
      totalQuantityWeight,
      totalQuantityVolume,
    })

    this.formRefInput.current.setFieldsValue({
      itemName: undefined,
      quantityWeight: undefined,
      quantityVolume: undefined,
      unitPrice: undefined,
      discount: undefined,
      totalPrice: undefined,
    })
  }

  onButtonAddClick = () => {
    const { salesOrderId } = this.props

    const { customer } = this.formRefInput.current.getFieldsValue()

    const {
      totalQuantityWeight,
      totalQuantityVolume,
      totalDiscount,
      totalPrice,
      orderList,
    } = this.state

    if (orderList === null || orderList.length < 1) {
      notification.error({
        message: 'Mohon isi daftar order',
      })
      return
    }

    const payload = {
      id: salesOrderId,
      customer,
      totalQuantityWeight,
      totalQuantityVolume,
      totalDiscount,
      totalPrice,
      items: orderList,
    }

    const { addTransaction } = this.props

    // send transaction data to backend
    addTransaction(payload)
  }

  render() {
    const columns = [
      {
        title: 'Tipe Item',
        width: 100,
        dataIndex: 'itemType',
        key: 'itemType',
      },
      {
        title: 'Nama Item',
        width: 100,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Cairkan Item',
        width: 100,
        dataIndex: 'isThawedDescription',
        key: 'isThawedDescription',
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
      {
        title: 'Harga /kg',
        width: 100,
        dataIndex: 'unitPrice',
        key: 'unitPrice',
      },
      {
        title: 'Discount',
        width: 100,
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        title: 'Total',
        width: 100,
        dataIndex: 'totalPrice',
        key: 'totalPrice',
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

    const { salesOrderId, transactionData } = this.props

    const fullDate = new Date()
    const today = fullDate.toLocaleDateString('en-US')
    const isInputDisabled = true

    let {
      thawingOptionHideToggle,
      itemSelectOption,
      orderList,
      quantityWeightMeasurementUnit,
      quantityVolumeMeasurementUnit,
      customerSelectOption,
      totalDiscount,
      totalPrice,
      totalQuantityWeight,
      totalQuantityVolume,
    } = this.state

    thawingOptionHideToggle = thawingOptionHideToggle === null ? true : thawingOptionHideToggle

    customerSelectOption = customerSelectOption || []

    itemSelectOption = itemSelectOption || []

    orderList = orderList || []

    quantityWeightMeasurementUnit = quantityWeightMeasurementUnit || 'kg'
    quantityVolumeMeasurementUnit = quantityVolumeMeasurementUnit || 'Ekor'

    totalDiscount = totalDiscount || 0
    totalPrice = totalPrice || 0
    totalQuantityWeight = totalQuantityWeight || 0
    totalQuantityVolume = totalQuantityVolume || 0

    if (Object.keys(transactionData).length > 0) {
      // Populate customer list
      customerSelectOption = transactionData.customerList.map(o => (
        <Option value={o.name} key={o.name}>
          {o.name}
        </Option>
      ))
    }

    return (
      <div>
        <Helmet title="Input / Order" />
        <div className="kit__utils__heading">
          <h5>Input Order</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <Form
              {...formItemLayout}
              ref={this.formRefInput}
              labelAlign="left"
              onFinish={this.onFinish}
            >
              <Form.Item name="salesOrderId" label="Kode Cutting">
                <Input placeholder={salesOrderId} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item name="dateToday" label="Tanggal">
                <Input placeholder={today} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item
                id="customer"
                name="customer"
                label="Nama Customer"
                rules={[{ required: true, message: 'Customer harus dipilih' }]}
              >
                <Select placeholder="Pilih customer">{customerSelectOption}</Select>
              </Form.Item>
              <Form.Item
                id="itemSource"
                name="itemSource"
                label="Asal Item"
                rules={[{ required: true, message: 'Asal Item harus dipilih' }]}
              >
                <Select onChange={this.onItemSourceChange} placeholder="Pilih asal item">
                  <Option value="freshWarehouse" key="freshWarehouse">
                    Stok Fresh
                  </Option>
                  <Option value="frozenWarehouse" key="frozenWarehouse">
                    Stok Frozen
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                id="itemName"
                name="itemName"
                label="Nama Item"
                rules={[{ required: true, message: 'Item harus dipilih' }]}
              >
                <Select onChange={this.onItemChange} placeholder="Pilih item">
                  {itemSelectOption}
                </Select>
              </Form.Item>
              <Form.Item
                name="quantityWeight"
                label="Quantity"
                rules={[{ required: true, message: 'Quantity harus diisi' }]}
              >
                <Input
                  type="number"
                  onChange={this.onQuantityWeightChange}
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
              <Form.Item
                name="unitPrice"
                label="Harga / kg"
                rules={[{ required: true, message: 'Harga harus diisi' }]}
              >
                <Input
                  type="number"
                  onChange={this.onUnitPriceChange}
                  placeholder="Masukkan harga/kg"
                  addonBefore="Rp."
                  addonAfter="/ kg"
                />
              </Form.Item>
              <Form.Item name="discount" label="Discount">
                <Input
                  type="number"
                  onChange={this.onDiscountChange}
                  placeholder="0"
                  addonBefore="Rp."
                  addonAfter="/ kg"
                />
              </Form.Item>
              <Form.Item
                name="totalPrice"
                label="Total harga"
                rules={[{ required: true, message: 'Total harga harus diisi' }]}
              >
                <Input
                  type="number"
                  disabled={isInputDisabled}
                  placeholder="Masukkan total harga"
                  addonBefore="Rp."
                />
              </Form.Item>
              <Form.Item
                valuePropName="checked"
                name="isThawed"
                style={thawingOptionHideToggle === true ? { display: 'none' } : { display: '' }}
              >
                <Checkbox className="text-uppercase">Centang jika item ingin dicairkan</Checkbox>
              </Form.Item>
              <button type="submit" className="btn btn-success">
                Tambah Order
              </button>
              <div>
                <br />
              </div>
              <div className="mb-4 kit__utils__scrollTable">
                <Table columns={columns} dataSource={orderList} scroll={{ x: 1500, y: 300 }} />
              </div>
            </Form>
            <div className="border-top text-dark font-size-18 pt-4">
              <p className="mb-1 text-right">
                Total Qty (kg): <strong className="font-size-24">Rp. {totalQuantityWeight}</strong>
              </p>
              <p className="mb-1 text-right">
                Total Qty (Ekor/Pax):{' '}
                <strong className="font-size-24">Rp. {totalQuantityVolume}</strong>
              </p>
              <p className="mb-1 text-right">
                Total Discount: <strong className="font-size-24">Rp {totalDiscount}</strong>
              </p>
              <p className="mb-4 text-right">
                Grand Total: <strong className="font-size-36">Rp {totalPrice}</strong>
              </p>
              <Link to="/transaction" className="kit__utils__link font-size-16">
                <i className="fe fe-arrow-left mr-1 align-middle" />
                Kembali
              </Link>
              <Button
                onClick={this.onButtonAddClick}
                className="btn btn-lg btn-success width-200 mb-2 float-right"
              >
                Submit Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)
