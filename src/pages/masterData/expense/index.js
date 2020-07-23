import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from 'antd'
import TableExpense from './form/main'

const Purchase = () => {
  return (
    <div>
      <Helmet title="Daftar / Biaya" />
      <div className="kit__utils__heading">
        <h5>
          <span className="mr-3">Daftar Biaya</span>
        </h5>
      </div>
      <div className="card">
        <div className="px-4">
          <br />
          <Link to="/master-data/expense/input">
            <Button type="primary" size="large" style={{ width: 150, marginRight: 8 }}>
              Tambah Biaya
            </Button>
          </Link>
        </div>
        <div className="card-body">
          <TableExpense />
        </div>
      </div>
    </div>
  )
}
export default Purchase
