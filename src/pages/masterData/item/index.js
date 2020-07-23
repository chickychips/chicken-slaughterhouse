import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from 'antd'
import TablesProduct from './form/main'

const Product = () => {
  return (
    <div>
      <Helmet title="Daftar / Produk" />
      <div className="kit__utils__heading">
        <h5>
          <span className="mr-3">Daftar Produk</span>
        </h5>
      </div>
      <div className="card">
        <div className="px-4">
          <br />
          <Link to="/master-data/item/input">
            <Button type="primary" size="large" style={{ width: 150, marginRight: 8 }}>
              Tambah Produk
            </Button>
          </Link>
        </div>
        <div className="card-body">
          <TablesProduct />
        </div>
      </div>
    </div>
  )
}
export default Product
