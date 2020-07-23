import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Layout from 'layouts'

const routes = [
  // Dashboards
  {
    path: '/dashboard/alpha',
    Component: lazy(() => import('pages/dashboard/alpha')),
    exact: true,
  },
  // Master Data
  {
    path: '/master-data/supplier',
    Component: lazy(() => import('pages/masterData/supplier')),
    exact: true,
  },
  {
    path: '/master-data/supplier/input',
    Component: lazy(() => import('pages/masterData/supplier/form/input')),
    exact: true,
  },
  {
    path: '/master-data/customer',
    Component: lazy(() => import('pages/masterData/customer')),
    exact: true,
  },
  {
    path: '/master-data/customer/input',
    Component: lazy(() => import('pages/masterData/customer/form/input')),
    exact: true,
  },
  {
    path: '/master-data/measurement-unit',
    Component: lazy(() => import('pages/masterData/measurementUnit')),
    exact: true,
  },
  {
    path: '/master-data/measurement-unit/input',
    Component: lazy(() => import('pages/masterData/measurementUnit/form/input')),
    exact: true,
  },
  {
    path: '/master-data/item',
    Component: lazy(() => import('pages/masterData/item')),
    exact: true,
  },
  {
    path: '/master-data/item/input',
    Component: lazy(() => import('pages/masterData/item/form/input')),
    exact: true,
  },
  {
    path: '/master-data/expense',
    Component: lazy(() => import('pages/masterData/expense')),
    exact: true,
  },
  {
    path: '/master-data/expense/input',
    Component: lazy(() => import('pages/masterData/expense/form/input')),
    exact: true,
  },

  // Productions
  {
    path: '/production/purchase',
    Component: lazy(() => import('pages/production/purchase')),
    exact: true,
  },
  {
    path: '/production/purchase/input',
    Component: lazy(() => import('pages/production/purchase/form/input')),
    exact: true,
  },
  {
    path: '/production/cutting',
    Component: lazy(() => import('pages/production/cutting')),
    exact: true,
  },
  {
    path: '/production/thawing',
    Component: lazy(() => import('pages/production/thawing')),
    exact: true,
  },
  {
    path: '/production/freeze',
    Component: lazy(() => import('pages/production/freeze')),
    exact: true,
  },
  {
    path: '/production/expense',
    Component: lazy(() => import('pages/production/expense')),
    exact: true,
  },
  {
    path: '/production/expense/input',
    Component: lazy(() => import('pages/production/expense/form/input')),
    exact: true,
  },

  // Storage
  {
    path: '/storage/fresh',
    Component: lazy(() => import('pages/storage/fresh')),
    exact: true,
  },
  {
    path: '/storage/fresh/stock-out',
    Component: lazy(() => import('pages/storage/fresh/form/stockOut')),
    exact: true,
  },
  {
    path: '/storage/fresh/conversion',
    Component: lazy(() => import('pages/storage/fresh/form/conversion')),
    exact: true,
  },
  {
    path: '/storage/frozen',
    Component: lazy(() => import('pages/storage/frozen')),
    exact: true,
  },
  {
    path: '/storage/frozen/stock-out',
    Component: lazy(() => import('pages/storage/frozen/form/stockOut')),
    exact: true,
  },
  {
    path: '/storage/frozen/conversion',
    Component: lazy(() => import('pages/storage/frozen/form/conversion')),
    exact: true,
  },

  // Transaction
  {
    path: '/transaction',
    Component: lazy(() => import('pages/transaction')),
    exact: true,
  },
  {
    path: '/transaction/input',
    Component: lazy(() => import('pages/transaction/form/input')),
    exact: true,
  },

  // Auth Pages
  {
    path: '/auth/login',
    Component: lazy(() => import('pages/auth/login')),
    exact: true,
  },
  {
    path: '/auth/support',
    Component: lazy(() => import('pages/auth/support')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/auth/404')),
    exact: true,
  },
  {
    path: '/auth/500',
    Component: lazy(() => import('pages/auth/500')),
    exact: true,
  },
  {
    path: '/auth/503',
    Component: lazy(() => import('pages/auth/503')),
    exact: true,
  },

  // Reporting
  {
    path: '/reporting/production',
    Component: lazy(() => import('pages/reporting/production')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={state => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Redirect to="/dashboard/alpha" />} />
                    {routes.map(({ path, Component, exact }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                            <div className={routerAnimation}>
                              <Suspense fallback={null}>
                                <Component />
                              </Suspense>
                            </div>
                          )
                        }}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
