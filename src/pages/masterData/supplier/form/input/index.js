import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Input, Form } from 'antd'
import './style.module.css'

const mapStateToProps = ({ dispatch }) => ({
  dispatch,
})

const { TextArea } = Input

const InputmasterDataOrder = ({ dispatch }) => {
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

  const onFinish = values => {
    dispatch({
      type: 'masterData/ADD_SUPPLIER',
      payload: values,
    })
  }

  return (
    <div>
      <Helmet title="Tambah / Pemasok" />
      <div className="kit__utils__heading">
        <h5>Tambah Pemasok</h5>
      </div>
      <div className="card">
        <div className="card-body">
          <Form {...formItemLayout} labelAlign="left" onFinish={onFinish}>
            <Form.Item
              id="name"
              name="name"
              label="Nama Pemasok"
              rules={[{ required: true, message: 'Nama harus diisi' }]}
            >
              <Input placeholder="Tulis Nama Pemasok" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Alamat"
              rules={[{ required: true, message: 'Alamat harus diisi' }]}
            >
              <Input placeholder="Tulis Alamat" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Deskripsi"
              rules={[{ required: true, message: 'Deskripsi harus diisi' }]}
            >
              <TextArea rows={4} placeholder="Tulis Deskripsi" />
            </Form.Item>
            <Link to="/master-data/supplier" className="kit__utils__link font-size-16">
              <i className="fe fe-arrow-left mr-1 align-middle" />
              Kembali
            </Link>
            <button type="submit" className="btn btn-success float-right">
              Tambah Pemasok
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(InputmasterDataOrder)
