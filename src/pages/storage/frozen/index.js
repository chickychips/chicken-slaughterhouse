import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from 'antd'
import TableFrozenStorage from './form/main'

const frozenStorage = () => {
  return (
    <div>
      <Helmet title="Gudang / Frozen" />
      <div className="kit__utils__heading">
        <h5>
          <span className="mr-3">Gudang Frozen</span>
        </h5>
      </div>
      <div className="card">
        <div className="px-4">
          <br />
          <Link to="/storage/frozen/stock-out">
            <Button type="primary" size="large" style={{ width: 150, marginRight: 8 }}>
              Buat Surat Jalan
            </Button>
          </Link>
          <Link to="/storage/frozen/conversion">
            <Button type="primary" size="large" style={{ width: 150, marginRight: 8 }}>
              Konversi Item
            </Button>
          </Link>
        </div>
        <div className="card-body">
          <TableFrozenStorage />
        </div>
      </div>
    </div>
  )
}
export default frozenStorage
