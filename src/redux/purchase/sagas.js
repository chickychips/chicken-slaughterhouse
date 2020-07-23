import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
  jwt: {
    getSupply: jwt.getSupply,
    generatePurchaseOrderId: jwt.generatePurchaseOrderId,
    submitPurchaseOrder: jwt.submitPurchaseOrder,
  },
}

export function* GENERATE_ORDER_ID() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].generatePurchaseOrderId)
  if (response) {
    yield put({
      type: 'purchase/SET_STATE',
      payload: {
        newPurchaseOrderId: response.newId,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'purchase/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_SUPPLY() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getSupply)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'purchase/SET_STATE',
      payload: {
        purchaseData: response,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'purchase/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* SUBMIT_PURCHASE_ORDER({ payload }) {
  const {
    productionId,
    supplierName,
    itemName,
    quantityWeight,
    quantityVolume,
    unitPrice,
    totalPrice,
  } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].submitPurchaseOrder,
    productionId,
    supplierName,
    itemName,
    quantityWeight,
    quantityVolume,
    unitPrice,
    totalPrice,
    username,
  )
  if (response) {
    yield history.push('/production/purchase')
    notification.success({
      message: 'Submit purchase order succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'purchase/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SUPPLY, GET_SUPPLY),
    takeEvery(actions.GENERATE_ORDER_ID, GENERATE_ORDER_ID),
    takeEvery(actions.SUBMIT_PURCHASE_ORDER, SUBMIT_PURCHASE_ORDER),
  ])
}
