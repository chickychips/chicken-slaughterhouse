import React from 'react'
import { Table } from 'antd'

class TableTransactionDetail extends React.Component {
  render() {
    const columns = [
      {
        title: 'Item',
        width: 10,
        dataIndex: 'item_name_actual',
        key: 'item_name_actual',
      },
      {
        title: 'Qty (kg)',
        width: 10,
        dataIndex: 'quantity_weight',
        key: 'quantity_weight',
      },
      {
        title: 'Qty (Ekor/Pax)',
        width: 10,
        dataIndex: 'quantity_volume',
        key: 'quantity_volume',
      },
      {
        title: 'Harga /kg',
        width: 10,
        dataIndex: 'unit_price',
        key: 'unit_price',
      },
      {
        title: 'Discount',
        width: 10,
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        title: 'Total',
        width: 10,
        dataIndex: 'total_price',
        key: 'total_price',
      },
    ]

    const { transactionDetail } = this.props

    if (transactionDetail.length > 0) {
      // Add key to each index so it will be unique
      transactionDetail.forEach((item, i) => {
        item.key = i + 1
        item.item_name_actual = `${item.is_frozen === true ? 'FROZEN' : 'FRESH'} ${item.item_name}`
      })

      return (
        <div>
          <Table columns={columns} dataSource={transactionDetail} />
        </div>
      )
    }

    return (
      <div>
        <Table columns={columns} />
      </div>
    )
  }
}

export default TableTransactionDetail
