import React from 'react'
import { connect } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Table, Input, Button } from 'antd'
import TableExpenseDataDetail from '../expenseDetail'

const mapStateToProps = ({ expense }) => ({
  expenseData: expense.expenseData,
  expenseDetail: expense.expenseDetail,
})

const mapDispatchToProps = dispatch => {
  return {
    getExpenseData: () => dispatch({ type: 'expense/GET_DATA' }),
    resetExpenseData: () =>
      dispatch({
        type: 'expense/SET_STATE',
        payload: {
          expenseData: [],
        },
      }),
  }
}

class TableExpenseData extends React.Component {
  state = {
    searchText: '',
    sortedInfo: null,
    expandedRow: null,
  }

  componentDidMount() {
    const { getExpenseData, resetExpenseData } = this.props
    resetExpenseData()
    getExpenseData()
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
    let { sortedInfo, expandedRow } = this.state

    sortedInfo = sortedInfo || {}
    expandedRow = expandedRow || []

    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps('id'),
        sorter: (a, b) => a.id.replace(/-/g, '') - b.id.replace(/-/g, ''),
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      },
      {
        title: 'Tanggal',
        width: 250,
        dataIndex: 'createdOn',
        key: 'createdOn',
        ...this.getColumnSearchProps('createdOn'),
        sorter: (a, b) =>
          a.createdOn.replace(/-|:| |\./g, '') - b.createdOn.replace(/-|:| |\./g, ''),
        sortOrder: sortedInfo.columnKey === 'createdOn' && sortedInfo.order,
      },
      {
        title: 'Total Biaya Cutting',
        dataIndex: 'totalExpenseCutting',
        key: 'totalExpenseCutting',
        // render: text => <span>{`Rp ${text}`}</span>,
        ...this.getColumnSearchProps('totalExpenseCutting'),
        sorter: (a, b) => a.totalExpenseCutting - b.totalExpenseCutting,
        sortOrder: sortedInfo.columnKey === 'totalExpenseCutting' && sortedInfo.order,
      },
      {
        title: 'Total Biaya Freeze',
        dataIndex: 'totalExpenseFreeze',
        key: 'totalExpenseFreeze',
        // render: text => <span>{`Rp ${text}`}</span>,
        ...this.getColumnSearchProps('totalExpenseFreeze'),
        sorter: (a, b) => a.totalExpenseFreeze - b.totalExpenseFreeze,
        sortOrder: sortedInfo.columnKey === 'totalExpenseFreeze' && sortedInfo.order,
      },
      {
        title: 'Total Biaya Thawing',
        dataIndex: 'totalExpenseThawing',
        key: 'totalExpenseThawing',
        // render: text => <span>{`Rp ${text}`}</span>,
        ...this.getColumnSearchProps('totalExpenseThawing'),
        sorter: (a, b) => a.totalExpenseThawing - b.totalExpenseThawing,
        sortOrder: sortedInfo.columnKey === 'totalExpenseThawing' && sortedInfo.order,
      },
      {
        title: 'Created By',
        dataIndex: 'createdBy',
        key: 'createdBy',
        ...this.getColumnSearchProps('createdBy'),
        sorter: (a, b) => a.createdBy.length - b.createdBy.length,
        sortOrder: sortedInfo.columnKey === 'createdBy' && sortedInfo.order,
      },
    ]
    const { expenseData } = this.props

    if (expenseData.length > 0) {
      const flags = []
      const expenseDataId = []
      expenseData.forEach(item => {
        if (!flags[item.id]) {
          flags[item.id] = true
          expenseDataId.push(item.id)
        }
      })

      const expenseDataSummary = []
      let i = 0
      expenseDataId.forEach(id => {
        const expenseDataInId = expenseData.filter(data => {
          return data.id === id
        })

        let totalExpenseCutting = 0
        let totalExpenseFreeze = 0
        let totalExpenseThawing = 0
        expenseDataInId.forEach(item => {
          if (item.expense_type === 'cutting') {
            totalExpenseCutting += item.total_amount
          }

          if (item.expense_type === 'freeze') {
            totalExpenseFreeze += item.total_amount
          }

          if (item.expense_type === 'thawing') {
            totalExpenseThawing += item.total_amount
          }
        })

        const objBuffer = {}
        objBuffer.key = i
        objBuffer.id = expenseDataInId[0].id
        objBuffer.createdOn = expenseDataInId[0].created_on
        objBuffer.createdBy = expenseDataInId[0].created_by
        objBuffer.totalExpenseCutting = totalExpenseCutting
        objBuffer.totalExpenseFreeze = totalExpenseFreeze
        objBuffer.totalExpenseThawing = totalExpenseThawing
        expenseDataSummary.push(objBuffer)

        i += 1
      })

      return (
        <div className="text-nowrap">
          <Table
            columns={columns}
            dataSource={expenseDataSummary}
            onChange={this.handleChange}
            onExpand={(isExpanded, record) => {
              this.setState({
                expandedRow: isExpanded ? [record.key] : undefined,
              })
            }}
            expandedRowRender={record => (
              <TableExpenseDataDetail expenseDetail={expenseData} recordId={record.id} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenseData)
