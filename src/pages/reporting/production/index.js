import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
// import { Checkbox, Table, Input, Select, Form, Button, notification } from 'antd';
import { Table } from 'antd'
import './style.module.css'

// const { Option } = Select

const mapStateToProps = ({ transaction }) => ({
  salesOrderId: transaction.salesOrderId,
  transactionData: transaction.transactionData,
})

const mapDispatchToProps = dispatch => {
  return {
    generateSalesOrderId: () => {
      dispatch({
        type: 'transaction/GENERATE_ORDER_ID',
      })
    },
    getTransactionData: () => {
      dispatch({
        type: 'transaction/GET_TRANSACTION_DATA',
      })
    },
    addTransaction: payload => {
      dispatch({
        type: 'transaction/ADD_TRANSACTION',
        payload,
      })
    },
  }
}

class ReportProduction extends React.Component {
  // componentDidMount() {

  // }

  render() {
    const columns = [
      {
        title: 'ITEM DESCRIPTION',
        colSpan: 2,
        align: 'left',
        dataIndex: 'itemName',
        render: (text, row, index) => {
          const obj = {
            children: text,
            props: {},
          }
          if (index === 2) {
            obj.props.colSpan = 3
            obj.props.style = {
              background: '#6c757d',
              color: 'white',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }
          }
          if (index > 2 && index % 2 !== 0) {
            obj.props.rowSpan = 2
          }
          // Cell with even number index after index 2 is merged with above cell
          if (index > 2 && index % 2 === 0) {
            obj.props.rowSpan = 0
          }
          return obj
        },
      },
      {
        title: 'amount',
        colSpan: 0,
        dataIndex: 'amount',
        render: (text, row, index) => {
          if (index === 0) {
            return {
              props: {
                style: { background: 'orange' },
              },
              children: <div style={{ color: 'black', fontWeight: 'bold' }}>{text}</div>,
            }
          }
          if (index === 2) {
            return {
              props: {
                colSpan: 0,
              },
            }
          }
          return <span>{`${text}`}</span>
        },
      },
      {
        title: 'UoM',
        dataIndex: 'uom',
        render: (text, row, index) => {
          if (index === 2) {
            return {
              props: {
                colSpan: 0,
              },
            }
          }
          return <span>{text}</span>
        },
      },
    ]

    const data = [
      {
        key: '0',
        itemName: '',
        amount: 'TOTAL',
        uom: '',
      },
      {
        key: '1',
        itemName: 'NETT RAW MATERIAL',
        amount: '12200',
        uom: 'kg',
      },
      {
        key: '2',
        itemName: 'WHOLE CHICKEN',
        amount: '',
        uom: '',
      },
      {
        key: '3',
        itemName: 'KARKAS A 0.3-0.4',
        amount: '3.60',
        uom: 'kg',
      },
      {
        key: '4',
        itemName: 'KARKAS A 0.3-0.4',
        amount: '5',
        uom: '%',
      },
      {
        key: '5',
        itemName: 'KARKAS A 0.4-0.5',
        amount: '17.60',
        uom: 'kg',
      },
      {
        key: '6',
        itemName: 'KARKAS A 0.4-0.5',
        amount: '5',
        uom: '%',
      },
    ]

    // const renderContent = (value, row, index) => {
    //   const obj = {
    //     children: value,
    //     props: {},
    //   };
    //   if (index === 4) {
    //     obj.props.colSpan = 0;
    //   }
    //   return obj;
    // };

    // const columns = [
    //   {
    //     title: 'Name',
    //     dataIndex: 'name',
    //     render: (text, row, index) => {
    //       if (index < 4) {
    //         return <a>{text}</a>;
    //       }
    //       return {
    //         children: <a>{text}</a>,
    //         props: {
    //           colSpan: 5,
    //         },
    //       };
    //     },
    //   },
    //   {
    //     title: 'Age',
    //     dataIndex: 'age',
    //     render: renderContent,
    //   },
    //   {
    //     title: 'Home phone',
    //     colSpan: 2,
    //     dataIndex: 'tel',
    //     render: (value, row, index) => {
    //       const obj = {
    //         children: value,
    //         props: {},
    //       };
    //       if (index === 2) {
    //         obj.props.rowSpan = 2;
    //       }
    //       // These two are merged into above cell
    //       if (index === 3) {
    //         obj.props.rowSpan = 0;
    //       }
    //       if (index === 4) {
    //         obj.props.colSpan = 0;
    //       }
    //       return obj;
    //     },
    //   },
    //   {
    //     title: 'Phone',
    //     colSpan: 0,
    //     dataIndex: 'phone',
    //     render: renderContent,
    //   },
    //   {
    //     title: 'Address',
    //     dataIndex: 'address',
    //     render: renderContent,
    //   },
    // ];

    // const data = [
    //   {
    //     key: '1',
    //     name: 'John Brown',
    //     age: 32,
    //     tel: '0571-22098909',
    //     phone: 18889898989,
    //     address: 'New York No. 1 Lake Park',
    //   },
    //   {
    //     key: '2',
    //     name: 'Jim Green',
    //     tel: '0571-22098333',
    //     phone: 18889898888,
    //     age: 42,
    //     address: 'London No. 1 Lake Park',
    //   },
    //   {
    //     key: '3',
    //     name: 'Joe Black',
    //     age: 32,
    //     tel: '0575-22098909',
    //     phone: 18900010002,
    //     address: 'Sidney No. 1 Lake Park',
    //   },
    //   {
    //     key: '4',
    //     name: 'Jim Red',
    //     age: 18,
    //     tel: '0575-22098909',
    //     phone: 18900010002,
    //     address: 'London No. 2 Lake Park',
    //   },
    //   {
    //     key: '5',
    //     name: 'Jake White',
    //     age: 18,
    //     tel: '0575-22098909',
    //     phone: 18900010002,
    //     address: 'Dublin No. 2 Lake Park',
    //   },
    // ];

    // <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
    const showBorder = true
    const showPagination = false

    // const tableCSS = css({
    //   margin: '40px 120px',
    //   backgroundColor: 'white',
    //   '& table': {
    //     borderCollapse: 'collapse'
    //   },
    //   '& thead > tr > th': {
    //     backgroundColor: 'darkblue',
    //     color: 'white',
    //   },
    //   '& thead > tr': {
    //     borderWidth: '2px',
    //     borderColor: 'yellow',
    //     borderStyle: 'solid'
    //   }
    // });

    return (
      <div>
        <Helmet title="Input / Order" />
        <div className="kit__utils__heading">
          <h5>Input Order</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="mb-4 kit__utils__scrollTable">
              <Table
                // title={(text) => {
                //   return {
                //       props: {
                //         style: { background: "orange" }
                //       },
                //       children: <div style={{color: "black", fontWeight: 'bold'}}>{text}</div>
                //     }
                //   }
                // }
                // className={tableCSS}
                columns={columns}
                dataSource={data}
                bordered={showBorder}
                pagination={showPagination}
              />
            </div>
            <div className="border-top text-dark font-size-18 pt-4">
              <Link to="/transaction" className="kit__utils__link font-size-16">
                <i className="fe fe-arrow-left mr-1 align-middle" />
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportProduction)
