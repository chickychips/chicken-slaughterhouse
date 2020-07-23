import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Table, Input, Select, Form, Button, notification } from 'antd'

const { Option } = Select

const mapStateToProps = ({ storage }) => ({
  deliveryId: storage.deliveryId,
  itemsToBeDelivered: storage.itemsToBeDelivered,
})

const mapDispatchToProps = dispatch => {
  return {
    generateDeliveryId: () => {
      dispatch({
        type: 'storage/GENERATE_DELIVERY_ID',
        payload: {
          storageSource: 'frozen',
        },
      })
    },
    getPendingTransaction: () => {
      dispatch({
        type: 'storage/GET_PENDING_TRANSACTION',
        payload: {
          storageSource: 'frozen',
        },
      })
    },
    deliverItem: payload => {
      dispatch({
        type: 'storage/DELIVER_ITEM',
        payload,
      })
    },
  }
}

class DeliverItem extends React.Component {
  state = {
    transactionIdSelectOption: null,
    orderDetails: null,
    customer: null,
    totalQuantityWeight: null,
    totalQuantityVolume: null,
    orderDetailsForPayload: [],
  }

  formRefInput = React.createRef()

  componentDidMount() {
    const { generateDeliveryId, getPendingTransaction } = this.props
    generateDeliveryId()
    getPendingTransaction()
  }

  onTransactionIdChange = event => {
    const { itemsToBeDelivered } = this.props
    let orderDetails = []
    let totalQuantityWeight = 0
    let totalQuantityVolume = 0

    this.setState({
      orderDetails,
      totalQuantityWeight,
      totalQuantityVolume,
      orderDetailsForPayload: [],
    })

    orderDetails = itemsToBeDelivered.pendingTransactionData.filter(data => {
      return data.ref_id === event
    })

    const orderDetailsForPayload = []
    orderDetails.forEach((item, i) => {
      // Set order details for deliverItem payload
      const objBuffer = {}
      objBuffer.name = item.item_name
      objBuffer.isFrozen = item.is_frozen
      objBuffer.isThawed = item.is_thawed
      objBuffer.quantityWeight = item.quantity_weight
      objBuffer.quantityVolume = item.quantity_volume
      orderDetailsForPayload.push(objBuffer)

      // Add key to each index so it will be unique
      item.key = i + 1

      // add FROZEN in front of item name
      item.item_name_frozen = `FROZEN ${item.item_name}`

      item.is_item_thawing = item.is_thawed === true ? 'Iya' : 'Tidak'

      // Calculate the total quantity of all item
      totalQuantityWeight += parseInt(item.quantity_weight, 10)
      totalQuantityVolume += parseInt(item.quantity_volume, 10)
    })

    this.formRefInput.current.setFieldsValue({
      customer: orderDetails[0].customer,
    })

    this.setState({
      orderDetails,
      totalQuantityWeight,
      totalQuantityVolume,
      orderDetailsForPayload,
    })
  }

  onButtonAddClick = () => {
    const { deliveryId } = this.props

    const { transactionId } = this.formRefInput.current.getFieldsValue()

    const { orderDetails, orderDetailsForPayload } = this.state

    if (orderDetails === null || orderDetails.length < 1) {
      notification.error({
        message: 'Silahkan pilih kode invoice',
      })
      return
    }

    const payload = {
      id: deliveryId,
      transactionId,
      storageSource: 'frozen',
      items: orderDetailsForPayload,
    }

    const { deliverItem } = this.props

    // send data to backend
    deliverItem(payload)
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
        title: 'Item Perlu Thawing',
        width: 100,
        dataIndex: 'is_item_thawing',
        key: 'is_item_thawing',
      },
      {
        title: 'Qty (kg)',
        width: 100,
        dataIndex: 'quantity_weight',
        key: 'quantity_weight',
      },
      {
        title: 'Qty (Ekor/Pax)',
        width: 100,
        dataIndex: 'quantity_volume',
        key: 'quantity_volume',
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

    const { deliveryId, itemsToBeDelivered } = this.props

    const fullDate = new Date()
    const today = fullDate.toLocaleDateString('en-US')
    const isInputDisabled = true

    let {
      transactionIdSelectOption,
      customer,
      orderDetails,
      totalQuantityWeight,
      totalQuantityVolume,
    } = this.state

    transactionIdSelectOption = transactionIdSelectOption || []

    orderDetails = orderDetails || []

    totalQuantityWeight = totalQuantityWeight || 0
    totalQuantityVolume = totalQuantityVolume || 0
    customer = customer || ''

    if (Object.keys(itemsToBeDelivered).length > 0) {
      // Populate invoice id list
      transactionIdSelectOption = itemsToBeDelivered.pendingTransactionId.map(o => (
        <Option value={o} key={o}>
          {o}
        </Option>
      ))
    }

    return (
      <div>
        <Helmet title="Stock / Out" />
        <div className="kit__utils__heading">
          <h5>Stok Keluar</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <Form
              {...formItemLayout}
              ref={this.formRefInput}
              labelAlign="left"
              onFinish={this.onFinish}
            >
              <Form.Item name="deliveryId" label="Nomor Surat Jalan">
                <Input placeholder={deliveryId} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item name="dateToday" label="Tanggal">
                <Input placeholder={today} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item id="transactionId" name="transactionId" label="Kode Invoice">
                <Select onChange={this.onTransactionIdChange} placeholder="Pilih kode invoice">
                  {transactionIdSelectOption}
                </Select>
              </Form.Item>
              <Form.Item name="customer" label="Pembeli">
                <Input placeholder={customer} disabled={isInputDisabled} />
              </Form.Item>
              <div>
                <br />
              </div>
              <div className="mb-4 kit__utils__scrollTable">
                <Table columns={columns} dataSource={orderDetails} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliverItem)
