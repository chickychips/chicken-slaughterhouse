import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'

import styles from './style.module.scss'

const mapStateToProps = ({ dashboard }) => ({
  dashboardData: dashboard.dashboardData,
})

const mapDispatchToProps = dispatch => {
  return {
    getDashboardData: () => dispatch({ type: 'dashboard/GET_DATA' }),
    resetDashboardData: () =>
      dispatch({
        type: 'dashboard/SET_STATE',
        payload: {
          customers: [],
        },
      }),
  }
}

class DashboardAlpha extends React.Component {
  componentDidMount() {
    const { getDashboardData, resetDashboardData } = this.props
    resetDashboardData()
    getDashboardData()
  }

  render() {
    const ranges = [
      { divider: 1e18, suffix: 'E' },
      { divider: 1e15, suffix: 'P' },
      { divider: 1e12, suffix: 'T' },
      { divider: 1e9, suffix: 'B' },
      { divider: 1e6, suffix: 'M' },
      { divider: 1e3, suffix: 'k' },
    ]
    function formatNumber(n) {
      for (let i = 0; i < ranges.length; i += 1) {
        if (n >= ranges[i].divider) {
          return (n / ranges[i].divider).toString() + ranges[i].suffix
        }
      }
      return n.toString()
    }

    const chartBarOptions = {
      // fullWidth: true,
      chartPadding: {
        right: 10,
        left: 5,
        top: 1,
        bottom: 0,
      },
      // low: 0,
      axisY: {
        // showGrid: true,
        // showLabel: true,
        // offset: 0,
        // labelOffset: {
        //   x: 100,
        //   y: 10
        // },
        labelInterpolationFnc: value => {
          return formatNumber(value)
        },
      },
      // axisX: {
      //   // showGrid: true,
      //   // showLabel: true,
      //   // offset: 0,
      //   // labelOffset: {
      //   //   x: 0,
      //   //   y: 0
      //   // },
      // },
      // axisX: {
      //   function(value, index) {
      //     return index % 2 === 0 ? value : null;
      //   }
      // },
      seriesBarDistance: 50,
      plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
    }

    const chartPieOptions = {
      donut: true,
      donutWidth: 35,
      showLabel: false,
      plugins: [
        ChartistTooltip({
          anchorToPoint: false,
          appendToBody: true,
          seriesName: false,
        }),
      ],
    }
    const { dashboardData } = this.props

    const monthNameList = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const transactionSUMYtdBarData = {}
    transactionSUMYtdBarData.labels = []
    transactionSUMYtdBarData.series = [[]]

    const purchaseSUMYtdBarData = {}
    purchaseSUMYtdBarData.labels = []
    purchaseSUMYtdBarData.series = [[]]

    const topCustomerList = ['', '', '', '', '']
    const topCustomerPieData = {}
    topCustomerPieData.series = []

    const topSupplierList = ['', '', '', '', '']
    const topSupplierPieData = {}
    topSupplierPieData.series = []

    const topSalesList = ['', '', '', '', '']
    const topSalesPieData = {}
    topSalesPieData.series = []

    const topItemSoldList = ['', '', '', '', '']
    const topItemSoldPieData = {}
    topItemSoldPieData.series = []

    const currentMonth = new Date().getMonth() + 1

    if (Object.keys(dashboardData).length > 0) {
      // Populate transaction sum bar chart data
      let j
      for (j = 0; j < currentMonth; ) {
        const monthName = monthNameList[j]
        const transactionSumData = dashboardData.yearToDateTransactionSum.filter(data => {
          return data.month === monthName
        })
        const transactionSumValue =
          transactionSumData.length > 0 ? transactionSumData[0].total_price : 0
        transactionSUMYtdBarData.labels.push(monthNameList[j])
        transactionSUMYtdBarData.series[0].push(transactionSumValue)

        const purchaseSumData = dashboardData.yearToDatePurchaseSum.filter(data => {
          return data.month === monthName
        })
        const purchaseSumValue = purchaseSumData.length > 0 ? purchaseSumData[0].total_price : 0
        purchaseSUMYtdBarData.labels.push(monthNameList[j])
        purchaseSUMYtdBarData.series[0].push(purchaseSumValue)
        j += 1
      }
      dashboardData.top5Customer.forEach((item, i) => {
        topCustomerPieData.series.push({
          name: item.customer,
          value: item.total_price,
          key: i,
        })

        topCustomerList[i] = item.customer
      })

      dashboardData.top5Supplier.forEach((item, i) => {
        topSupplierPieData.series.push({
          name: item.supplier_name,
          value: item.total_price,
          key: i,
        })

        topSupplierList[i] = item.supplier_name
      })

      dashboardData.top5Sales.forEach((item, i) => {
        topSalesPieData.series.push({
          name: item.created_by,
          value: item.total_price,
          key: i,
        })

        topSalesList[i] = item.created_by
      })

      dashboardData.top5ItemSold.forEach((item, i) => {
        topItemSoldPieData.series.push({
          name: item.item_name,
          value: item.total_price,
          key: i,
        })

        topItemSoldList[i] = item.item_name
      })

      dashboardData.todayTransactionSum.total_price =
        dashboardData.todayTransactionSum.total_price || 0
      dashboardData.todayPurchaseSum.total_price = dashboardData.todayPurchaseSum.total_price || 0

      return (
        <div>
          <Helmet title="Dashboard: Analytics" />
          <div className="cui__utils__heading">
            <strong>Today Statistics</strong>
          </div>
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body overflow-hidden position-relative">
                  <div className="font-size-36 font-weight-bold text-dark mb-n2">
                    Rp. {dashboardData.todayTransactionSum.total_price}
                  </div>
                  <div className="text-uppercase">Total Penjualan Hari ini</div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body overflow-hidden position-relative">
                  <div className="font-size-36 font-weight-bold text-dark mb-n2">
                    Rp. {dashboardData.todayPurchaseSum.total_price}
                  </div>
                  <div className="text-uppercase">Total Pembelian Hari ini</div>
                </div>
              </div>
            </div>
          </div>
          <div className="cui__utils__heading">
            <strong>Year to Date Statistics</strong>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Penjualan Tahun Ini</strong>
              </div>
            </div>
            <div className="card-body overflow-hidden position-relative">
              <div className="mb-5">
                <ChartistGraph
                  className={`height-200 ${styles.chartBar}`}
                  data={transactionSUMYtdBarData}
                  options={chartBarOptions}
                  type="Bar"
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Pembelian Tahun Ini</strong>
              </div>
            </div>
            <div className="card-body overflow-hidden position-relative">
              <div className="mb-5">
                <ChartistGraph
                  className={`height-200 ${styles.chartBar}`}
                  data={purchaseSUMYtdBarData}
                  options={chartBarOptions}
                  type="Bar"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <div className="cui__utils__heading mb-0">
                    <strong className="text-uppercase font-size-16">Top Produk Terjual</strong>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6">
                      <div
                        className={`h-100 d-flex flex-column justify-content-center align-items-center ${styles.chartPie}`}
                      >
                        <div className="mb-4">
                          <ChartistGraph
                            data={topItemSoldPieData}
                            type="Pie"
                            options={chartPieOptions}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div
                        className={`h-100 d-flex flex-column justify-content-center align-items-center ${styles.chartPie}`}
                      >
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--success" />
                            {topItemSoldList[0]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--primary" />
                            {topItemSoldList[1]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--danger" />
                            {topItemSoldList[2]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--warning" />
                            {topItemSoldList[3]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--info" />
                            {topItemSoldList[4]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <div className="cui__utils__heading mb-0">
                    <strong className="text-uppercase font-size-16">Top Sales</strong>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6">
                      <div
                        className={`h-100 d-flex flex-column justify-content-center align-items-center ${styles.chartPie}`}
                      >
                        <div className="mb-4">
                          <ChartistGraph
                            data={topSalesPieData}
                            type="Pie"
                            options={chartPieOptions}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div
                        className={`h-100 d-flex flex-column justify-content-center align-items-center ${styles.chartPie}`}
                      >
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--success" />
                            {topSalesList[0]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--primary" />
                            {topSalesList[1]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--danger" />
                            {topSalesList[2]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--warning" />
                            {topSalesList[3]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--info" />
                            {topSalesList[4]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <div className="cui__utils__heading mb-0">
                    <strong className="text-uppercase font-size-16">Top Customers</strong>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6">
                      <div
                        className={`h-100 d-flex flex-column justify-content-center align-items-center ${styles.chartPie}`}
                      >
                        <div className="mb-4">
                          <ChartistGraph
                            data={topCustomerPieData}
                            type="Pie"
                            options={chartPieOptions}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div
                        className={`h-100 d-flex flex-column justify-content-center align-items-center ${styles.chartPie}`}
                      >
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--success" />
                            {topCustomerList[0]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--primary" />
                            {topCustomerList[1]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--danger" />
                            {topCustomerList[2]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--warning" />
                            {topCustomerList[3]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--info" />
                            {topCustomerList[4]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <div className="cui__utils__heading mb-0">
                    <strong className="text-uppercase font-size-16">Top Supplier</strong>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6">
                      <div
                        className={`h-100 d-flex flex-column justify-content-center align-items-center ${styles.chartPie}`}
                      >
                        <div className="mb-4">
                          <ChartistGraph
                            data={topSupplierPieData}
                            type="Pie"
                            options={chartPieOptions}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div
                        className={`h-100 d-flex flex-column justify-content-center align-items-center ${styles.chartPie}`}
                      >
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--success" />
                            {topSupplierList[0]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--primary" />
                            {topSupplierList[1]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--danger" />
                            {topSupplierList[2]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--warning" />
                            {topSupplierList[3]}
                          </span>
                        </div>
                        <div className="mr-auto">
                          <span className="mr-2">
                            <span className="kit__utils__donut kit__utils__donut--info" />
                            {topSupplierList[4]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <Helmet title="Dashboard: Analytics" />
        <div className="cui__utils__heading">
          <strong>Today Statistics</strong>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAlpha)
