import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from 'antd'
import TableHistoryPurchase from './form/main'

const Purchase = () => {
  return (
    <div>
      <Helmet title="History / Pengajuan" />
      <div className="kit__utils__heading">
        <h5>
          <span className="mr-3">History Pengajuan</span>
        </h5>
      </div>
      <div className="card">
        <div className="px-4">
          <br />
          <Link to="/production/purchase/input">
            <Button type="primary" size="large" style={{ width: 150, marginRight: 8 }}>
              Buat Pengajuan
            </Button>
          </Link>
        </div>
        <div className="card-body">
          <TableHistoryPurchase />
        </div>
      </div>
    </div>
  )
}
export default Purchase
