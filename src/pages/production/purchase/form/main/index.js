import React from 'react'
import { connect } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Table, Input, Button } from 'antd'

const mapStateToProps = ({ purchase }) => ({
  purchaseData: purchase.purchaseData,
})

const mapDispatchToProps = dispatch => {
  return {
    getSupply: () => dispatch({ type: 'purchase/GET_SUPPLY' }),
    resetSupply: () =>
      dispatch({
        type: 'purchase/SET_STATE',
        payload: {
          purchaseData: [],
        },
      }),
  }
}

class TableHistoryPurchase extends React.Component {
  state = {
    searchText: '',
    sortedInfo: null,
  }

  componentDidMount() {
    const { getSupply, resetSupply } = this.props
    resetSupply()
    getSupply()
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
      console.log('record', record[dataIndex])
      console.log('record', value)
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
    let { sortedInfo } = this.state
    sortedInfo = sortedInfo || {}
    const columns = [
      {
        title: 'Kode Produksi',
        width: 100,
        dataIndex: 'production_id',
        key: 'production_id',
        ...this.getColumnSearchProps('production_id'),
        sorter: (a, b) => a.production_id.replace(/-/g, '') - b.production_id.replace(/-/g, ''),
        sortOrder: sortedInfo.columnKey === 'production_id' && sortedInfo.order,
      },
      {
        title: 'Nama Item',
        width: 150,
        dataIndex: 'item_name',
        key: 'item_name',
        ...this.getColumnSearchProps('item_name'),
        sorter: (a, b) => a.item_name.length - b.item_name.length,
        sortOrder: sortedInfo.columnKey === 'item_name' && sortedInfo.order,
      },
      {
        title: 'Nama Supplier',
        width: 150,
        dataIndex: 'supplier_name',
        key: 'supplier_name',
        ...this.getColumnSearchProps('supplier_name'),
        sorter: (a, b) => a.supplier_name.length - b.supplier_name.length,
        sortOrder: sortedInfo.columnKey === 'supplier_name' && sortedInfo.order,
      },
      {
        title: 'Quantity (kg)',
        dataIndex: 'quantity_volume',
        key: 'quantity_volume',
        width: 100,
        sorter: (a, b) => a.quantity_volume - b.quantity_volume,
        sortOrder: sortedInfo.columnKey === 'quantity_volume' && sortedInfo.order,
      },
      {
        title: 'Quantity (Ekor)',
        dataIndex: 'quantity_weight',
        key: 'quantity_weight',
        width: 100,
        sorter: (a, b) => a.quantity_weight - b.quantity_weight,
        sortOrder: sortedInfo.columnKey === 'quantity_weight' && sortedInfo.order,
      },
      {
        title: 'Harga satuan',
        dataIndex: 'unit_price',
        key: 'unit_price',
        width: 150,
        sorter: (a, b) => a.unit_price - b.unit_price,
        sortOrder: sortedInfo.columnKey === 'unit_price' && sortedInfo.order,
      },
      {
        title: 'Harga Total',
        dataIndex: 'total_price',
        key: 'total_price',
        width: 150,
        sorter: (a, b) => a.total_price - b.total_price,
        sortOrder: sortedInfo.columnKey === 'total_price' && sortedInfo.order,
      },
      {
        title: 'Created On',
        dataIndex: 'created_on',
        key: 'created_on',
        width: 150,
        ...this.getColumnSearchProps('created_on'),
        sorter: (a, b) =>
          a.created_on.replace(/-|:| |\./g, '') - b.created_on.replace(/-|:| |\./g, ''),
        sortOrder: sortedInfo.columnKey === 'created_on' && sortedInfo.order,
      },
      {
        title: 'Created By',
        dataIndex: 'created_by',
        key: 'created_by',
        width: 150,
        ...this.getColumnSearchProps('created_by'),
        sorter: (a, b) => a.created_by.length - b.created_by.length,
        sortOrder: sortedInfo.columnKey === 'created_by' && sortedInfo.order,
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 60,
        render: () => <a>Edit</a>,
      },
    ]

    const { purchaseData } = this.props
    if (purchaseData.length > 0) {
      // Add key to each index so it will be unique
      purchaseData.forEach((item, i) => {
        item.key = i + 1
      })

      return (
        <div className="mb-4 kit__utils__scrollTable">
          <Table
            columns={columns}
            dataSource={purchaseData}
            onChange={this.handleChange}
            scroll={{ x: 1500, y: 300 }}
          />
        </div>
      )
    }

    return (
      <div className="mb-4 kit__utils__scrollTable">
        <Table columns={columns} scroll={{ x: 1500, y: 300 }} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableHistoryPurchase)
