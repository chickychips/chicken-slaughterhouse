import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Input, Select, Form } from 'antd'
import './style.module.css'

const { Option } = Select

const mapStateToProps = ({ dispatch, masterData }) => ({
  dispatch,
  measurementUnits: masterData.measurementUnits,
})

const { TextArea } = Input

const InputmasterDataOrder = ({ dispatch, measurementUnits }) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  }
  const isInputDisabled = true

  // Populate supplier list
  let measurementUnitSelectOption = (
    <Option key="measurementUnits" disabled={isInputDisabled}>
      satuan ukur
    </Option>
  )

  if (measurementUnits.length > 0) {
    measurementUnitSelectOption = measurementUnits.map(o => (
      <Option value={o.name} key={o.name}>
        {o.name}
      </Option>
    ))
  }

  useEffect(() => {
    getMeasurementUnits()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMeasurementUnits = () => {
    dispatch({
      type: 'masterData/GET_MEASUREMENT_UNITS',
    })
  }

  const onFinish = values => {
    const measurementUnitDetail = measurementUnits.filter(data => {
      return data.name === values.measurementUnit
    })

    values.measurementUnit = measurementUnitDetail[0].id

    dispatch({
      type: 'masterData/ADD_EXPENSE',
      payload: values,
    })
  }

  return (
    <div>
      <Helmet title="Input / Pengajuan" />
      <div className="kit__utils__heading">
        <h5>Tambah Biaya</h5>
      </div>
      <div className="card">
        <div className="card-body">
          <Form {...formItemLayout} labelAlign="left" onFinish={onFinish}>
            <Form.Item
              id="name"
              name="name"
              label="Nama Biaya"
              rules={[{ required: true, message: 'Nama harus diisi' }]}
            >
              <Input placeholder="Tulis Nama Biaya" />
            </Form.Item>
            <Form.Item
              id="measurementUnit"
              name="measurementUnit"
              label="Satuan Ukur"
              rules={[{ required: true, message: 'Satuan Ukur harus dipilih' }]}
            >
              <Select placeholder="Pilih Satuan Ukur">{measurementUnitSelectOption}</Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Deskripsi"
              rules={[{ required: true, message: 'Deskripsi harus diisi' }]}
            >
              <TextArea rows={4} placeholder="Tulis Deskripsi" />
            </Form.Item>
            <Link to="/master-data/expense" className="kit__utils__link font-size-16">
              <i className="fe fe-arrow-left mr-1 align-middle" />
              Kembali
            </Link>
            <button type="submit" className="btn btn-success float-right">
              Tambah Biaya
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(InputmasterDataOrder)
