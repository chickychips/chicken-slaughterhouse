import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Table, Input, Select, Form, Button, notification } from 'antd'
import './style.module.css'

const { Option } = Select

const mapStateToProps = ({ expense, masterData }) => ({
  newExpenseId: expense.newExpenseId,
  expenses: masterData.expenses,
})

const mapDispatchToProps = dispatch => {
  return {
    generateExpenseId: () => {
      dispatch({
        type: 'expense/GENERATE_EXPENSE_ID',
      })
    },
    getExpenses: () => {
      dispatch({
        type: 'masterData/GET_EXPENSES',
      })
    },
    addExpenseData: payload => {
      dispatch({
        type: 'expense/ADD_EXPENSE',
        payload,
      })
    },
  }
}

class AddExpenseData extends React.Component {
  state = {
    expensesSelectOption: null,
    expenseCuttingList: null,
    expenseCuttingMeasurementUnit: null,
    expenseFreezeList: null,
    expenseFreezeMeasurementUnit: null,
    expenseThawingList: null,
    expenseThawingMeasurementUnit: null,
  }

  formRefInputExpenseCutting = React.createRef()

  formRefInputExpenseFreeze = React.createRef()

  formRefInputExpenseThawing = React.createRef()

  componentDidMount() {
    const { generateExpenseId, getExpenses } = this.props
    generateExpenseId()
    getExpenses()
  }

  onExpenseCuttingNameChange = event => {
    const { expenses } = this.props

    this.formRefInputExpenseCutting.current.setFieldsValue({
      quantity: undefined,
      unitAmount: undefined,
      totalAmount: undefined,
    })

    const currentSelectedExpense = expenses.filter(data => {
      return data.name === event
    })

    this.setState({
      expenseCuttingMeasurementUnit: currentSelectedExpense[0].measurement_unit_name,
    })
  }

  onExpenseFreezeNameChange = event => {
    const { expenses } = this.props

    this.formRefInputExpenseFreeze.current.setFieldsValue({
      quantity: undefined,
      unitAmount: undefined,
      totalAmount: undefined,
    })

    const currentSelectedExpense = expenses.filter(data => {
      return data.name === event
    })

    this.setState({
      expenseFreezeMeasurementUnit: currentSelectedExpense[0].measurement_unit_name,
    })
  }

  onExpenseThawingNameChange = event => {
    const { expenses } = this.props

    this.formRefInputExpenseThawing.current.setFieldsValue({
      quantity: undefined,
      unitAmount: undefined,
      totalAmount: undefined,
    })

    const currentSelectedExpense = expenses.filter(data => {
      return data.name === event
    })

    this.setState({
      expenseThawingMeasurementUnit: currentSelectedExpense[0].measurement_unit_name,
    })
  }

  onCuttingQuantityChange = event => {
    let { unitAmount } = this.formRefInputExpenseCutting.current.getFieldsValue()
    if (unitAmount === undefined || unitAmount === '') unitAmount = 0

    const totalAmount = event.target.value * unitAmount
    this.formRefInputExpenseCutting.current.setFieldsValue({
      totalAmount,
    })
  }

  onCuttingUnitAmountChange = event => {
    let { quantity } = this.formRefInputExpenseCutting.current.getFieldsValue()
    if (quantity === undefined || quantity === '') quantity = 0

    const totalAmount = event.target.value * quantity
    this.formRefInputExpenseCutting.current.setFieldsValue({
      totalAmount,
    })
  }

  onFreezeQuantityChange = event => {
    let { unitAmount } = this.formRefInputExpenseFreeze.current.getFieldsValue()
    if (unitAmount === undefined || unitAmount === '') unitAmount = 0

    const totalAmount = event.target.value * unitAmount
    this.formRefInputExpenseFreeze.current.setFieldsValue({
      totalAmount,
    })
  }

  onFreezeUnitAmountChange = event => {
    let { quantity } = this.formRefInputExpenseFreeze.current.getFieldsValue()
    if (quantity === undefined || quantity === '') quantity = 0

    const totalAmount = event.target.value * quantity
    this.formRefInputExpenseFreeze.current.setFieldsValue({
      totalAmount,
    })
  }

  onThawingQuantityChange = event => {
    let { unitAmount } = this.formRefInputExpenseThawing.current.getFieldsValue()
    if (unitAmount === undefined || unitAmount === '') unitAmount = 0

    const totalAmount = event.target.value * unitAmount
    this.formRefInputExpenseThawing.current.setFieldsValue({
      totalAmount,
    })
  }

  onThawingUnitAmountChange = event => {
    let { quantity } = this.formRefInputExpenseThawing.current.getFieldsValue()
    if (quantity === undefined || quantity === '') quantity = 0

    const totalAmount = event.target.value * quantity
    this.formRefInputExpenseThawing.current.setFieldsValue({
      totalAmount,
    })
  }

  onFinishExpenseCutting = values => {
    let { expenseCuttingList } = this.state
    const { expenseCuttingMeasurementUnit } = this.state
    this.setState({
      expenseCuttingList: [],
    })
    let keyId = 1
    if (expenseCuttingList === null) {
      expenseCuttingList = []
    } else if (expenseCuttingList.length > 0) {
      keyId = expenseCuttingList[expenseCuttingList.length - 1].key + 1
    }

    expenseCuttingList.push({
      key: keyId,
      expense_type: 'cutting',
      expense_name: values.expenseName,
      measurement_unit: expenseCuttingMeasurementUnit,
      quantity: values.quantity,
      unit_amount: values.unitAmount,
      total_amount: values.totalAmount,
    })

    this.setState({
      expenseCuttingList,
    })

    this.formRefInputExpenseCutting.current.setFieldsValue({
      expenseName: undefined,
      measurement_unit: 'pax',
      quantity: undefined,
      unitAmount: undefined,
      totalAmount: undefined,
    })
  }

  onFinishExpenseFreeze = values => {
    let { expenseFreezeList } = this.state
    const { expenseFreezeMeasurementUnit } = this.state
    this.setState({
      expenseFreezeList: [],
    })
    let keyId = 1
    if (expenseFreezeList === null) {
      expenseFreezeList = []
    } else if (expenseFreezeList.length > 0) {
      keyId = expenseFreezeList[expenseFreezeList.length - 1].key + 1
    }

    expenseFreezeList.push({
      key: keyId,
      expense_type: 'freeze',
      expense_name: values.expenseName,
      measurement_unit: expenseFreezeMeasurementUnit,
      quantity: values.quantity,
      unit_amount: values.unitAmount,
      total_amount: values.totalAmount,
    })

    this.setState({
      expenseFreezeList,
    })

    this.formRefInputExpenseFreeze.current.setFieldsValue({
      expenseName: undefined,
      measurement_unit: 'pax',
      quantity: undefined,
      unitAmount: undefined,
      totalAmount: undefined,
    })
  }

  onFinishExpenseThawing = values => {
    let { expenseThawingList } = this.state
    const { expenseThawingMeasurementUnit } = this.state
    this.setState({
      expenseThawingList: [],
    })
    let keyId = 1
    if (expenseThawingList === null) {
      expenseThawingList = []
    } else if (expenseThawingList.length > 0) {
      keyId = expenseThawingList[expenseThawingList.length - 1].key + 1
    }

    expenseThawingList.push({
      key: keyId,
      expense_type: 'thawing',
      expense_name: values.expenseName,
      measurement_unit: expenseThawingMeasurementUnit,
      quantity: values.quantity,
      unit_amount: values.unitAmount,
      total_amount: values.totalAmount,
    })

    this.setState({
      expenseThawingList,
    })

    this.formRefInputExpenseThawing.current.setFieldsValue({
      expenseName: undefined,
      measurement_unit: 'pax',
      quantity: undefined,
      unitAmount: undefined,
      totalAmount: undefined,
    })
  }

  onButtonAddClick = () => {
    const { newExpenseId } = this.props

    const { expenseCuttingList, expenseFreezeList, expenseThawingList } = this.state

    if (
      (expenseCuttingList === null || expenseCuttingList.length < 1) &&
      (expenseFreezeList === null || expenseFreezeList.length < 1) &&
      (expenseThawingList === null || expenseThawingList.length < 1)
    ) {
      notification.error({
        message: 'Please fill required data',
      })
      return
    }

    const payload = {
      expenseId: newExpenseId,
      expenseCutting: expenseCuttingList,
      expenseFreeze: expenseFreezeList,
      expenseThawing: expenseThawingList,
    }
    console.log(payload)

    const { addExpenseData } = this.props

    // send cutting data to backend
    addExpenseData(payload)
  }

  render() {
    const columns = [
      {
        title: 'Tipe Biaya',
        dataIndex: 'expense_type',
        key: 'expense_type',
      },
      {
        title: 'Nama Biaya',
        dataIndex: 'expense_name',
        key: 'expense_name',
      },
      {
        title: 'Jumlah',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Satuan',
        dataIndex: 'measurement_unit',
        key: 'measurement_unit',
      },
      {
        title: 'Harga',
        dataIndex: 'unit_amount',
        key: 'unit_amount',
      },
      {
        title: 'Total',
        dataIndex: 'total_amount',
        key: 'total_amount',
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

    const { newExpenseId, expenses } = this.props

    const fullDate = new Date()
    const today = fullDate.toLocaleDateString('en-US')
    const isInputDisabled = true

    let {
      expensesSelectOption,
      expenseCuttingList,
      expenseCuttingMeasurementUnit,
      expenseFreezeList,
      expenseFreezeMeasurementUnit,
      expenseThawingList,
      expenseThawingMeasurementUnit,
    } = this.state

    expenseCuttingList = expenseCuttingList || []
    expenseCuttingMeasurementUnit = expenseCuttingMeasurementUnit || 'pax'

    expenseFreezeList = expenseFreezeList || []
    expenseFreezeMeasurementUnit = expenseFreezeMeasurementUnit || 'pax'

    expenseThawingList = expenseThawingList || []
    expenseThawingMeasurementUnit = expenseThawingMeasurementUnit || 'pax'

    if (expenses.length > 0) {
      expensesSelectOption = expenses.map(o => (
        <Option value={o.name} key={o.name}>
          {o.name}
        </Option>
      ))
    }

    return (
      <div>
        <Helmet title="Input / Pengajuan" />
        <div className="kit__utils__heading">
          <h5>Input Biaya</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <Form
              {...formItemLayout}
              ref={this.formRefInputExpenseCutting}
              labelAlign="left"
              onFinish={this.onFinishExpenseCutting}
            >
              <div className="kit__utils__heading">
                <h5>Biaya Produksi Cutting</h5>
              </div>
              <Form.Item name="expenseId" label="Kode Biaya">
                <Input placeholder={newExpenseId} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item name="dateToday" label="Tanggal">
                <Input placeholder={today} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item
                id="expenseName"
                name="expenseName"
                label="Nama Biaya"
                rules={[{ required: true, message: 'Nama Biaya harus dipilih' }]}
              >
                <Select onChange={this.onExpenseCuttingNameChange} placeholder="Pilih Biaya">
                  {expensesSelectOption}
                </Select>
              </Form.Item>
              <Form.Item
                name="quantity"
                label="Jumlah"
                rules={[{ required: true, message: 'Jumlah harus diisi' }]}
              >
                <Input
                  type="number"
                  onChange={this.onCuttingQuantityChange}
                  placeholder="Masukkan jumlah"
                  addonAfter={expenseCuttingMeasurementUnit}
                />
              </Form.Item>
              <Form.Item
                name="unitAmount"
                label="Harga"
                rules={[{ required: true, message: 'Harga harus diisi' }]}
              >
                <Input
                  type="number"
                  onChange={this.onCuttingUnitAmountChange}
                  addonBefore="Rp"
                  placeholder="Masukkan harga"
                />
              </Form.Item>
              <Form.Item
                name="totalAmount"
                label="Total"
                rules={[{ required: true, message: 'Total harus diisi' }]}
              >
                <Input
                  type="number"
                  addonBefore="Rp"
                  placeholder="Masukkan Total"
                  disabled={isInputDisabled}
                />
              </Form.Item>
              <button type="submit" className="btn btn-success">
                Tambah Biaya Cutting
              </button>
              <div>
                <br />
              </div>
              <div className="mb-4 kit__utils__scrollTable">
                <Table
                  columns={columns}
                  dataSource={expenseCuttingList}
                  scroll={{ x: 1500, y: 300 }}
                />
              </div>
            </Form>
            <Form
              {...formItemLayout}
              ref={this.formRefInputExpenseFreeze}
              labelAlign="left"
              onFinish={this.onFinishExpenseFreeze}
            >
              <div className="kit__utils__heading">
                <h5>Biaya Produksi Freeze</h5>
              </div>
              <Form.Item name="expenseId" label="Kode Biaya">
                <Input placeholder={newExpenseId} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item name="dateToday" label="Tanggal">
                <Input placeholder={today} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item
                id="expenseName"
                name="expenseName"
                label="Nama Biaya"
                rules={[{ required: true, message: 'Nama Biaya harus dipilih' }]}
              >
                <Select onChange={this.onExpenseFreezeNameChange} placeholder="Pilih Biaya">
                  {expensesSelectOption}
                </Select>
              </Form.Item>
              <Form.Item
                name="quantity"
                label="Jumlah"
                rules={[{ required: true, message: 'Jumlah harus diisi' }]}
              >
                <Input
                  type="number"
                  onChange={this.onFreezeQuantityChange}
                  placeholder="Masukkan jumlah"
                  addonAfter={expenseFreezeMeasurementUnit}
                />
              </Form.Item>
              <Form.Item
                name="unitAmount"
                label="Harga"
                rules={[{ required: true, message: 'Harga harus diisi' }]}
              >
                <Input
                  type="number"
                  onChange={this.onFreezeUnitAmountChange}
                  addonBefore="Rp"
                  placeholder="Masukkan harga"
                />
              </Form.Item>
              <Form.Item
                name="totalAmount"
                label="Total"
                rules={[{ required: true, message: 'Total harus diisi' }]}
              >
                <Input
                  type="number"
                  addonBefore="Rp"
                  placeholder="Masukkan Total"
                  disabled={isInputDisabled}
                />
              </Form.Item>
              <button type="submit" className="btn btn-success">
                Tambah Biaya Freeze
              </button>
              <div>
                <br />
              </div>
              <div className="mb-4 kit__utils__scrollTable">
                <Table
                  columns={columns}
                  dataSource={expenseFreezeList}
                  scroll={{ x: 1500, y: 300 }}
                />
              </div>
            </Form>
            <Form
              {...formItemLayout}
              ref={this.formRefInputExpenseThawing}
              labelAlign="left"
              onFinish={this.onFinishExpenseThawing}
            >
              <div className="kit__utils__heading">
                <h5>Biaya Produksi Thawing</h5>
              </div>
              <Form.Item name="expenseId" label="Kode Biaya">
                <Input placeholder={newExpenseId} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item name="dateToday" label="Tanggal">
                <Input placeholder={today} disabled={isInputDisabled} />
              </Form.Item>
              <Form.Item
                id="expenseName"
                name="expenseName"
                label="Nama Biaya"
                rules={[{ required: true, message: 'Nama Biaya harus dipilih' }]}
              >
                <Select onChange={this.onExpenseThawingNameChange} placeholder="Pilih Biaya">
                  {expensesSelectOption}
                </Select>
              </Form.Item>
              <Form.Item
                name="quantity"
                label="Jumlah"
                rules={[{ required: true, message: 'Jumlah harus diisi' }]}
              >
                <Input
                  type="number"
                  onChange={this.onThawingQuantityChange}
                  placeholder="Masukkan jumlah"
                  addonAfter={expenseThawingMeasurementUnit}
                />
              </Form.Item>
              <Form.Item
                name="unitAmount"
                label="Harga"
                rules={[{ required: true, message: 'Harga harus diisi' }]}
              >
                <Input
                  type="number"
                  onChange={this.onThawingUnitAmountChange}
                  addonBefore="Rp"
                  placeholder="Masukkan harga"
                />
              </Form.Item>
              <Form.Item
                name="totalAmount"
                label="Total"
                rules={[{ required: true, message: 'Total harus diisi' }]}
              >
                <Input
                  type="number"
                  addonBefore="Rp"
                  placeholder="Masukkan Total"
                  disabled={isInputDisabled}
                />
              </Form.Item>
              <button type="submit" className="btn btn-success">
                Tambah Biaya Thawing
              </button>
              <div>
                <br />
              </div>
              <div className="mb-4 kit__utils__scrollTable">
                <Table
                  columns={columns}
                  dataSource={expenseThawingList}
                  scroll={{ x: 1500, y: 300 }}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseData)
