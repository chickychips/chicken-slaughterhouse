import React from 'react'
import { connect } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Table, Input, Button } from 'antd'

const mapStateToProps = ({ storage }) => ({
  freshItemStock: storage.freshItemStock,
})

const mapDispatchToProps = dispatch => {
  return {
    getFreshItemStock: () => dispatch({ type: 'storage/GET_FRESH_ITEM_STOCK' }),
    resetFreshItemStock: () =>
      dispatch({
        type: 'storage/SET_STATE',
        payload: {
          freshItemStock: [],
        },
      }),
  }
}

class TableFreshStorage extends React.Component {
  state = {
    searchText: '',
    sortedInfo: null,
  }

  componentDidMount() {
    const { getFreshItemStock, resetFreshItemStock } = this.props
    resetFreshItemStock()
    getFreshItemStock()
  }

  handleChange = (pagination, filters, sorter) => {
    console.log(sorter)
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
    let { sortedInfo } = this.state
    sortedInfo = sortedInfo || {}
    const columns = [
      {
        title: 'Nama',
        width: 150,
        dataIndex: 'item_name_fresh',
        key: 'item_name_fresh',
        ...this.getColumnSearchProps('item_name_fresh'),
        sorter: (a, b) => a.item_name_fresh.length - b.item_name_fresh.length,
        sortOrder: sortedInfo.columnKey === 'item_name_fresh' && sortedInfo.order,
      },
      {
        title: 'Tipe Produk',
        dataIndex: 'productType',
        key: 'productType',
        width: 150,
        ...this.getColumnSearchProps('productType'),
        sorter: (a, b) => a.productType.length - b.productType.length,
        sortOrder: sortedInfo.columnKey === 'productType' && sortedInfo.order,
      },
      {
        title: 'Quantity (kg)',
        dataIndex: 'quantity_weight',
        key: 'quantity_weight',
        width: 150,
        ...this.getColumnSearchProps('quantity_weight'),
        sorter: (a, b) => a.quantity_weight - b.quantity_weight,
        sortOrder: sortedInfo.columnKey === 'quantity_weight' && sortedInfo.order,
      },
      {
        title: 'Quantity (ekor/pax)',
        dataIndex: 'quantity_volume',
        key: 'quantity_volume',
        width: 150,
        ...this.getColumnSearchProps('quantity_volume'),
        sorter: (a, b) => a.quantity_volume - b.quantity_volume,
        sortOrder: sortedInfo.columnKey === 'quantity_volume' && sortedInfo.order,
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 60,
        render: () => <a>Edit</a>,
      },
    ]

    const { freshItemStock } = this.props
    if (freshItemStock.length > 0) {
      // Add key to each index so it will be unique
      freshItemStock.forEach((item, i) => {
        item.key = i + 1

        item.item_name_fresh = item.group === 'alive' ? item.item_name : `FRESH ${item.item_name}`

        // Define product type from group and output type
        item.productType = item.group === 'alive' ? 'BAHAN DASAR' : 'HASIL CUTTING'
        if (item.productType === 'HASIL CUTTING') {
          const groupName = item.group === 'whole' ? '' : ' OLAHAN'
          const outputTypeName = item.type === 'main' ? ' UTAMA' : ' SAMPINGAN'
          item.productType = `${item.productType}${groupName}${outputTypeName}`
        }
      })

      return (
        <div className="mb-4 kit__utils__scrollTable">
          <Table
            columns={columns}
            dataSource={freshItemStock}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableFreshStorage)
