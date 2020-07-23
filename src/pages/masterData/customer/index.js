import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from 'antd'
import TableCustomer from './form/main'

const Customer = () => {
  return (
    <div>
      <Helmet title="Daftar / Pelanggan" />
      <div className="kit__utils__heading">
        <h5>
          <span className="mr-3">Daftar Pelanggan</span>
        </h5>
      </div>
      <div className="card">
        <div className="px-4">
          <br />
          <Link to="/master-data/customer/input">
            <Button type="primary" size="large" style={{ width: 150, marginRight: 8 }}>
              Tambah Pelanggan
            </Button>
          </Link>
        </div>
        <div className="card-body">
          <TableCustomer />
        </div>
      </div>
    </div>
  )
}
export default Customer
