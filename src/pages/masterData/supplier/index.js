import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from 'antd'
import TableSupplier from './form/main'

const Supplier = () => {
  return (
    <div>
      <Helmet title="Daftar / Pemasok" />
      <div className="kit__utils__heading">
        <h5>
          <span className="mr-3">Daftar Pemasok</span>
        </h5>
      </div>
      <div className="card">
        <div className="px-4">
          <br />
          <Link to="/master-data/supplier/input">
            <Button type="primary" size="large" style={{ width: 150, marginRight: 8 }}>
              Tambah Pemasok
            </Button>
          </Link>
        </div>
        <div className="card-body">
          <TableSupplier />
        </div>
      </div>
    </div>
  )
}
export default Supplier
