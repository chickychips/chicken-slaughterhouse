import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from 'antd'
import TableTransaction from './form/main'

const Transaction = () => {
  return (
    <div>
      <Helmet title="History / Penjualan" />
      <div className="kit__utils__heading">
        <h5>
          <span className="mr-3">Daftar Penjualan</span>
        </h5>
      </div>
      <div className="card">
        <div className="px-4">
          <br />
          <Link to="/transaction/input">
            <Button type="primary" size="large" style={{ width: 100, marginRight: 8 }}>
              Buat Order
            </Button>
          </Link>
        </div>
        <div className="card-body">
          <TableTransaction />
        </div>
      </div>
    </div>
  )
}
export default Transaction
