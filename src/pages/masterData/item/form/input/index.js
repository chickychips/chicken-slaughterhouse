import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Input, Select, Form } from 'antd'
import './style.module.css'

const { Option } = Select

const mapStateToProps = ({ masterData }) => ({
  outputTypeHideToggle: masterData.outputTypeHideToggle,
  outputTypeRequired: masterData.outputTypeRequired,
})

const { TextArea } = Input

const InputmasterDataOrder = ({ dispatch, outputTypeHideToggle, outputTypeRequired }) => {
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

  const onItemTypeChange = event => {
    if (event !== 'alive') {
      dispatch({
        type: 'masterData/SET_STATE',
        payload: {
          outputTypeHideToggle: false,
          outputTypeRequired: true,
        },
      })
    } else {
      dispatch({
        type: 'masterData/SET_STATE',
        payload: {
          outputTypeHideToggle: true,
          outputTypeRequired: false,
        },
      })
    }
  }

  const onFinish = values => {
    if (values.itemType === 'alive') {
      values.itemOutputType = 'main'
    }

    dispatch({
      type: 'masterData/ADD_ITEM',
      payload: values,
    })
  }

  return (
    <div>
      <Helmet title="Tambah / Produk" />
      <div className="kit__utils__heading">
        <h5>Tambah Produk</h5>
      </div>
      <div className="card">
        <div className="card-body">
          <Form {...formItemLayout} labelAlign="left" onFinish={onFinish}>
            <Form.Item
              id="itemType"
              name="itemType"
              label="Tipe Produk"
              rules={[{ required: true, message: 'Tipe Produk harus dipilih' }]}
            >
              <Select onChange={onItemTypeChange} placeholder="Pilih Tipe Produk">
                <Option value="alive" key="typeAlive">
                  Bahan Dasar
                </Option>
                <Option value="whole" key="typeWhole">
                  Hasil Cutting
                </Option>
                <Option value="pieces" key="typePieces">
                  Hasil Cutting Olahan
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              id="itemOutputType"
              name="itemOutputType"
              label="Tipe Hasil Cutting"
              rules={[
                { required: outputTypeRequired, message: 'Tipe Hasil Cutting harus dipilih' },
              ]}
              style={outputTypeHideToggle === true ? { display: 'none' } : { display: '' }}
            >
              <Select placeholder="Pilih Tipe Produk">
                <Option value="main" key="outputTypeMain">
                  Utama
                </Option>
                <Option value="side" key="outputTypeSide">
                  Sampingan
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              id="name"
              name="name"
              label="Nama Produk"
              rules={[{ required: true, message: 'Nama Produk harus diisi' }]}
            >
              <Input placeholder="Tulis Nama Produk" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Deskripsi"
              rules={[{ required: true, message: 'Deskripsi harus diisi' }]}
            >
              <TextArea rows={4} placeholder="Tulis Deskripsi" />
            </Form.Item>
            <Link to="/master-data/item" className="kit__utils__link font-size-16">
              <i className="fe fe-arrow-left mr-1 align-middle" />
              Kembali
            </Link>
            <button type="submit" className="btn btn-success float-right">
              Tambah Produk
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(InputmasterDataOrder)
