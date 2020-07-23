import React from 'react'
import { connect } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Table, Input, Button } from 'antd'

const mapStateToProps = ({ masterData }) => ({
  items: masterData.items,
})

const mapDispatchToProps = dispatch => {
  return {
    getItems: () => dispatch({ type: 'masterData/GET_ITEMS' }),
    resetItems: () =>
      dispatch({
        type: 'masterData/SET_STATE',
        payload: {
          items: [],
        },
      }),
  }
}

class TableProduct extends React.Component {
  state = {
    searchText: '',
    sortedInfo: null,
  }

  componentDidMount() {
    const { getItems, resetItems } = this.props
    resetItems()
    getItems()
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
    let { sortedInfo } = this.state
    sortedInfo = sortedInfo || {}
    const columns = [
      {
        title: 'Nama',
        width: 150,
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: 'Tipe Produk',
        dataIndex: 'productType',
        key: 'productType',
        width: 150,
        sorter: (a, b) => a.productType.length - b.productType.length,
        sortOrder: sortedInfo.columnKey === 'productType' && sortedInfo.order,
      },
      {
        title: 'Deskripsi',
        dataIndex: 'description',
        key: 'description',
        width: 200,
        sorter: (a, b) => a.description.length - b.description.length,
        sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
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
        title: 'Modified On',
        dataIndex: 'modified_on',
        key: 'modified_on',
        width: 150,
        ...this.getColumnSearchProps('modified_on'),
        sorter: (a, b) =>
          (a.modified_on === null ? '' : a.modified_on.replace(/-|:| |\./g, '')) -
          (b.modified_on === null ? '' : b.modified_on.replace(/-|:| |\./g, '')),
        sortOrder: sortedInfo.columnKey === 'modified_on' && sortedInfo.order,
      },
      {
        title: 'Modified By',
        dataIndex: 'modified_by',
        key: 'modified_by',
        width: 150,
        ...this.getColumnSearchProps('modified_by'),
        sorter: (a, b) =>
          (a.modified_by === null ? '' : a.modified_by.length) -
          (b.modified_by === null ? '' : b.modified_by.length),
        sortOrder: sortedInfo.columnKey === 'modified_by' && sortedInfo.order,
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 60,
        render: () => <a>Edit</a>,
      },
    ]

    const { items } = this.props
    if (items.length > 0) {
      // Add key to each index so it will be unique
      items.forEach((item, i) => {
        item.key = i + 1

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
            dataSource={items}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableProduct)
