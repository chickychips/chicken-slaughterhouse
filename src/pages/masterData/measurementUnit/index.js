import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button } from 'antd'
import TableMeasurementUnit from './form/main'

const MeasurementUnit = () => {
  return (
    <div>
      <Helmet title="Daftar / Satuan Ukur" />
      <div className="kit__utils__heading">
        <h5>
          <span className="mr-3">Daftar Satuan Ukur</span>
        </h5>
      </div>
      <div className="card">
        <div className="px-4">
          <br />
          <Link to="/master-data/measurement-unit/input">
            <Button type="primary" size="large" style={{ width: 170, marginRight: 8 }}>
              Tambah Satuan Ukur
            </Button>
          </Link>
        </div>
        <div className="card-body">
          <TableMeasurementUnit />
        </div>
      </div>
    </div>
  )
}
export default MeasurementUnit
