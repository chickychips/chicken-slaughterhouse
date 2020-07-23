import React from 'react'
import { Helmet } from 'react-helmet'
import TableExpenseRecap from './form/main'

const Purchase = () => {
  return (
    <div>
      <Helmet title="Rekap / Biaya / Produksi" />
      <div className="kit__utils__heading">
        <h5>
          <span className="mr-3">Rekap Biaya Produksi</span>
        </h5>
      </div>
      <div className="card">
        <div className="card-body">
          <TableExpenseRecap />
        </div>
      </div>
    </div>
  )
}
export default Purchase
