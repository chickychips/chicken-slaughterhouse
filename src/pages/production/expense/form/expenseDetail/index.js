import React from 'react'
import { Table } from 'antd'

class TableexpenseDetail extends React.Component {
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
        title: 'Satuan',
        dataIndex: 'measurement_unit_name',
        key: 'measurement_unit_name',
      },
      {
        title: 'Jumlah',
        dataIndex: 'quantity',
        key: 'quantity',
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

    const { expenseDetail, recordId } = this.props

    if (expenseDetail.length > 0) {
      const expenseDetailInId = expenseDetail.filter(data => {
        return data.id === recordId
      })
      // Add key to each index so it will be unique
      expenseDetailInId.forEach((item, i) => {
        item.key = i + 1
      })

      return (
        <div>
          <Table columns={columns} dataSource={expenseDetailInId} />
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

export default TableexpenseDetail
