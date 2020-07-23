import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
  jwt: {
    generateSalesOrderId: jwt.generateSalesOrderId,
    getTransactionData: jwt.getTransactionData,
    getTransactionHistory: jwt.getTransactionHistory,
    getTransactionDetail: jwt.getTransactionDetail,
    addTransaction: jwt.addTransaction,
  },
}

export function* GENERATE_ORDER_ID() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].generateSalesOrderId)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'transaction/SET_STATE',
      payload: {
        salesOrderId: response.newId,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'transaction/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_TRANSACTION_DATA() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getTransactionData)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'transaction/SET_STATE',
      payload: {
        transactionData: response,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'transaction/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_TRANSACTION_DETAIL({ payload }) {
  const { id } = payload

  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getTransactionDetail, id)
  if (response) {
    console.log('sagas', response.transactionDetail)
    yield put({
      type: 'transaction/SET_STATE',
      payload: {
        transactionDetail: response.transactionDetail,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'transaction/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_TRANSACTION_HISTORY() {
  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getTransactionHistory, username)
  if (response) {
    console.log('sagas', response.transactionHistory)
    yield put({
      type: 'transaction/SET_STATE',
      payload: {
        transactionHistory: response.transactionHistory,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'transaction/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* ADD_TRANSACTION({ payload }) {
  const {
    id,
    customer,
    totalQuantityWeight,
    totalQuantityVolume,
    totalDiscount,
    totalPrice,
    items,
  } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].addTransaction,
    id,
    customer,
    totalQuantityWeight,
    totalQuantityVolume,
    totalDiscount,
    totalPrice,
    items,
    username,
  )
  if (response) {
    yield history.push('/transaction')
    notification.success({
      message: 'Add transaction succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'transaction/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GENERATE_ORDER_ID, GENERATE_ORDER_ID),
    takeEvery(actions.GET_TRANSACTION_DATA, GET_TRANSACTION_DATA),
    takeEvery(actions.GET_TRANSACTION_HISTORY, GET_TRANSACTION_HISTORY),
    takeEvery(actions.GET_TRANSACTION_DETAIL, GET_TRANSACTION_DETAIL),
    takeEvery(actions.ADD_TRANSACTION, ADD_TRANSACTION),
  ])
}
