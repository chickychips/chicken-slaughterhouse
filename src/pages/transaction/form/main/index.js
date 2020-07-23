import React from 'react'
import { connect } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Table, Input, Button } from 'antd'
import TableTransactionDetail from '../transactionDetail'

const mapStateToProps = ({ transaction }) => ({
  transactionHistory: transaction.transactionHistory,
  transactionDetail: transaction.transactionDetail,
})

const mapDispatchToProps = dispatch => {
  return {
    getTransactionHistory: () => dispatch({ type: 'transaction/GET_TRANSACTION_HISTORY' }),
    resetTransactionHistory: () =>
      dispatch({
        type: 'transaction/SET_STATE',
        payload: {
          transactionHistory: [],
        },
      }),
    getTransactionDetail: id =>
      dispatch({
        type: 'transaction/GET_TRANSACTION_DETAIL',
        payload: {
          id,
        },
      }),
  }
}

class TableTransaction extends React.Component {
  state = {
    searchText: '',
    sortedInfo: null,
    expandedRow: null,
    latestRecordId: null,
  }

  componentDidMount() {
    const { getTransactionHistory, resetTransactionHistory } = this.props
    resetTransactionHistory()
    getTransactionHistory()
  }

  handleChange = (pagination, filters, sorter) => {
    console.log(sorter)
    // console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      sortedInfo: sorter,
    })
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          // placeholder={`Search ${dataIndex}`}
          placeholder="Cari"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      record[dataIndex] = record[dataIndex] === null ? '' : record[dataIndex]
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    },
    render: text => {
      const { searchText } = this.state
      text = text === null ? '' : text
      if (dataIndex === 'id') {
        return (
          <a className="btn btn-sm btn-light" href="#" onClick={e => e.preventDefault()}>
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          </a>
        )
      }
      if (dataIndex === 'customer') {
        return (
          <a className="btn btn-sm btn-light" href="#" onClick={e => e.preventDefault()}>
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          </a>
        )
      }
      if (dataIndex === 'status_name') {
        return (
          <span
            className={
              text === 'PENDING'
                ? 'font-size-12 badge badge-primary'
                : 'font-size-12 badge badge-default'
            }
          >
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          </span>
        )
      }

      return (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      )
    },
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  render() {
    let { sortedInfo, expandedRow, latestRecordId } = this.state

    sortedInfo = sortedInfo || {}
    expandedRow = expandedRow || []
    latestRecordId = latestRecordId || ''

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps('id'),
        sorter: (a, b) => a.id.replace(/-/g, '') - b.id.replace(/-/g, ''),
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      },
      {
        title: 'Tanggal',
        width: 250,
        dataIndex: 'created_on',
        key: 'created_on',
        ...this.getColumnSearchProps('created_on'),
        sorter: (a, b) =>
          a.created_on.replace(/-|:| |\./g, '') - b.created_on.replace(/-|:| |\./g, ''),
        sortOrder: sortedInfo.columnKey === 'created_on' && sortedInfo.order,
      },
      {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
        ...this.getColumnSearchProps('customer'),
        sorter: (a, b) => a.customer.length - b.customer.length,
        sortOrder: sortedInfo.columnKey === 'customer' && sortedInfo.order,
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
        // render: text => <span>{`Rp ${text}`}</span>,
        ...this.getColumnSearchProps('discount'),
        sorter: (a, b) => a.discount - b.discount,
        sortOrder: sortedInfo.columnKey === 'discount' && sortedInfo.order,
      },
      {
        title: 'Total',
        dataIndex: 'total_price',
        key: 'total_price',
        // render: text => <span>{`Rp ${text}`}</span>,
        ...this.getColumnSearchProps('total_price'),
        sorter: (a, b) => a.total_price - b.total_price,
        sortOrder: sortedInfo.columnKey === 'total_price' && sortedInfo.order,
      },
      {
        title: 'Qty (kg)',
        width: 150,
        dataIndex: 'total_quantity_weight',
        key: 'total_quantity_weight',
        ...this.getColumnSearchProps('quantity_weight'),
        sorter: (a, b) => a.total_quantity_weight - b.total_quantity_weight,
        sortOrder: sortedInfo.columnKey === 'total_quantity_weight' && sortedInfo.order,
      },
      {
        title: 'Qty (Ekor/Pax)',
        width: 150,
        dataIndex: 'total_quantity_volume',
        key: 'total_quantity_volume',
        ...this.getColumnSearchProps('quantity_volume'),
        sorter: (a, b) => a.total_quantity_volume - b.total_quantity_volume,
        sortOrder: sortedInfo.columnKey === 'total_quantity_volume' && sortedInfo.order,
      },
      {
        title: 'Sales',
        dataIndex: 'created_by',
        key: 'created_by',
        ...this.getColumnSearchProps('created_by'),
        sorter: (a, b) => a.created_by.length - b.created_by.length,
        sortOrder: sortedInfo.columnKey === 'created_by' && sortedInfo.order,
      },
      {
        title: 'Status',
        dataIndex: 'status_name',
        key: 'status_name',
        fixed: 'right',
        ...this.getColumnSearchProps('status_name'),
        sorter: (a, b) => a.status_name.length - b.status_name.length,
        sortOrder: sortedInfo.columnKey === 'status_name' && sortedInfo.order,
      },
      {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        render: () => (
          <span>
            <a href="#" onClick={e => e.preventDefault()} className="btn btn-sm btn-light">
              <small>
                <i className="fe fe-trash mr-2" />
              </small>
              Cancel
            </a>
          </span>
        ),
      },
    ]
    const { transactionHistory, transactionDetail, getTransactionDetail } = this.props

    if (transactionHistory.length > 0) {
      // Add key to each index so it will be unique
      transactionHistory.forEach((item, i) => {
        item.key = i + 1
      })

      return (
        <div className="text-nowrap">
          <Table
            columns={columns}
            dataSource={transactionHistory}
            onChange={this.handleChange}
            onExpand={(isExpanded, record) => {
              if (latestRecordId !== record.id) {
                getTransactionDetail(record.id)
              }

              this.setState({
                latestRecordId: record.id,
                expandedRow: isExpanded ? [record.key] : undefined,
              })
            }}
            expandedRowRender={() => (
              <TableTransactionDetail transactionDetail={transactionDetail} />
            )}
            expandedRowKeys={expandedRow}
            expandRowByClick="true"
            scroll={{ x: 1500, y: 300 }}
          />
        </div>
      )
    }

    return (
      <div className="text-nowrap">
        <Table columns={columns} scroll={{ x: 1500, y: 300 }} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableTransaction)
