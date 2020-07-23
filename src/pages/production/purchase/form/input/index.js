import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Input, Select, Form } from 'antd'
import './style.module.css'

const { Option } = Select

const mapStateToProps = ({ purchase, params }) => ({
  newPurchaseOrderId: purchase.newPurchaseOrderId,
  items: params.items,
  suppliers: params.suppliers,
})

const InputPurchaseOrder = ({ dispatch, newPurchaseOrderId, items, suppliers }) => {
  const [formInput] = Form.useForm()

  const fullDate = new Date()
  const today = fullDate.toLocaleDateString('en-US')
  const isInputDisabled = true

  // Populate item list
  let itemSelectOption = (
    <Option key="item" disabled={isInputDisabled}>
      items
    </Option>
  )

  if (items.length > 0) {
    itemSelectOption = items.map(o => (
      <Option value={o.name} key={o.name}>
        {o.name}
      </Option>
    ))
  }

  // Populate supplier list
  let supplierSelectOption = (
    <Option key="supplier" disabled={isInputDisabled}>
      suppliers
    </Option>
  )

  if (suppliers.length > 0) {
    supplierSelectOption = suppliers.map(o => (
      <Option value={o.name} key={o.name}>
        {o.name}
      </Option>
    ))
  }

  useEffect(() => {
    generatePurchaseOrderId()
    getItemList()
    getSupplierList()
    formInput.setFieldsValue({
      quantityWeight: '0',
      quantityVolume: '0',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generatePurchaseOrderId = () => {
    dispatch({
      type: 'purchase/GENERATE_ORDER_ID',
    })
  }

  const getItemList = () => {
    dispatch({
      type: 'params/GET_ITEM_LIST',
    })
  }

  const getSupplierList = () => {
    dispatch({
      type: 'params/GET_SUPPLIER_LIST',
    })
  }

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

  const onQuantityWeightChange = event => {
    let { unitPrice } = formInput.getFieldsValue()
    if (unitPrice === undefined || unitPrice === '') unitPrice = 0

    const totalPrice = event.target.value * unitPrice
    formInput.setFieldsValue({
      totalPrice,
    })
  }

  const onUnitPriceChange = event => {
    let { quantityWeight } = formInput.getFieldsValue()
    if (quantityWeight === undefined || quantityWeight === '') quantityWeight = 0

    const totalPrice = event.target.value * quantityWeight
    formInput.setFieldsValue({
      totalPrice,
    })
  }

  const onFinish = values => {
    values.productionId = newPurchaseOrderId
    values.dateToday = today

    dispatch({
      type: 'purchase/SUBMIT_PURCHASE_ORDER',
      payload: values,
    })
  }

  return (
    <div>
      <Helmet title="Input / Pengajuan" />
      <div className="kit__utils__heading">
        <h5>Input pengajuan</h5>
      </div>
      <div className="card">
        <div className="card-body">
          <Form form={formInput} {...formItemLayout} labelAlign="left" onFinish={onFinish}>
            <Form.Item name="productionId" label="Kode Produksi">
              <Input placeholder={newPurchaseOrderId} disabled={isInputDisabled} />
            </Form.Item>
            <Form.Item name="dateToday" label="Tanggal">
              <Input placeholder={today} disabled={isInputDisabled} />
            </Form.Item>
            <Form.Item
              id="itemName"
              name="itemName"
              label="Nama Item"
              rules={[{ required: true, message: 'Item harus dipilih' }]}
            >
              <Select placeholder="Pilih item">{itemSelectOption}</Select>
            </Form.Item>
            <Form.Item
              name="supplierName"
              label="Supplier"
              rules={[{ required: true, message: 'Supplier harus dipilih' }]}
            >
              <Select id="supplierNameSelect" placeholder="Pilih supplier">
                {supplierSelectOption}
              </Select>
            </Form.Item>
            <Form.Item
              name="quantityWeight"
              label="Quantity"
              rules={[{ required: true, message: 'Quantity harus diisi' }]}
            >
              <Input
                type="number"
                onChange={onQuantityWeightChange}
                placeholder="Masukkan quantity"
                addonAfter="kg"
              />
            </Form.Item>
            <Form.Item
              name="quantityVolume"
              label="Quantity"
              rules={[{ required: true, message: 'Quantity harus diisi' }]}
            >
              <Input type="number" placeholder="Masukkan quantity" addonAfter="Ekor" />
            </Form.Item>
            <Form.Item
              name="unitPrice"
              label="Harga / kg"
              rules={[{ required: true, message: 'Harga harus diisi' }]}
            >
              <Input
                type="number"
                onChange={onUnitPriceChange}
                placeholder="Masukkan harga/kg"
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
            <Link to="/production/purchase" className="kit__utils__link font-size-16">
              <i className="fe fe-arrow-left mr-1 align-middle" />
              Kembali
            </Link>
            <button type="submit" className="btn btn-success float-right">
              Buat Pengajuan
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(InputPurchaseOrder)
