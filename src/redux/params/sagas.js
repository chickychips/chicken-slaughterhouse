import { all, takeEvery, put, call, select } from 'redux-saga/effects'
// import { notification } from 'antd'
// import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
  jwt: {
    getItemList: jwt.getItemList,
    getSupplierList: jwt.getSupplierList,
  },
}

export function* GET_ITEM_LIST() {
  console.log('sagas get item list')
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getItemList)
  if (response) {
    yield put({
      type: 'params/SET_STATE',
      payload: {
        items: response.items,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'purchase/SET_STATE',
      payload: {
        items: [],
      },
    })
  }
}

export function* GET_SUPPLIER_LIST() {
  console.log('sagas get supplier list')
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getSupplierList)
  if (response) {
    yield put({
      type: 'params/SET_STATE',
      payload: {
        suppliers: response.suppliers,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'purchase/SET_STATE',
      payload: {
        suppliers: [],
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_ITEM_LIST, GET_ITEM_LIST),
    takeEvery(actions.GET_SUPPLIER_LIST, GET_SUPPLIER_LIST),
  ])
}
