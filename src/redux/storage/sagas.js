import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
  jwt: {
    getFreshItemStock: jwt.getFreshItemStock,
    getFrozenItemStock: jwt.getFrozenItemStock,
    generateDeliveryId: jwt.generateDeliveryId,
    getPendingTransaction: jwt.getPendingTransaction,
    deliverItem: jwt.deliverItem,
    generateConversionId: jwt.generateConversionId,
    processItemConversion: jwt.processItemConversion,
  },
}

export function* GENERATE_DELIVERY_ID({ payload }) {
  const { storageSource } = payload

  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].generateDeliveryId, storageSource)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        deliveryId: response.newId,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_PENDING_TRANSACTION({ payload }) {
  const { storageSource } = payload

  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getPendingTransaction, storageSource)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        itemsToBeDelivered: response,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* DELIVER_ITEM({ payload }) {
  const { id, transactionId, storageSource, items } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].deliverItem,
    id,
    transactionId,
    storageSource,
    items,
    username,
  )
  if (response) {
    yield history.push(`/storage/${storageSource}`)

    notification.success({
      message: 'Deliver item succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_FRESH_ITEM_STOCK() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getFreshItemStock)
  if (response) {
    console.log('sagas', response.items)
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        freshItemStock: response.items,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_FROZEN_ITEM_STOCK() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getFrozenItemStock)
  if (response) {
    console.log('sagas', response.items)
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        frozenItemStock: response.items,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GENERATE_CONVERSION_ID() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].generateConversionId)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        conversionId: response.newId,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* PROCESS_ITEM_CONVERSION({ payload }) {
  const { conversionId, storageSource, items } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].processItemConversion,
    conversionId,
    storageSource,
    items,
    username,
  )
  if (response) {
    yield history.push(`/storage/${storageSource}`)

    notification.success({
      message: 'item conversion succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'storage/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_FROZEN_ITEM_STOCK, GET_FROZEN_ITEM_STOCK),
    takeEvery(actions.GET_FRESH_ITEM_STOCK, GET_FRESH_ITEM_STOCK),
    takeEvery(actions.GENERATE_DELIVERY_ID, GENERATE_DELIVERY_ID),
    takeEvery(actions.GET_PENDING_TRANSACTION, GET_PENDING_TRANSACTION),
    takeEvery(actions.DELIVER_ITEM, DELIVER_ITEM),
    takeEvery(actions.GENERATE_CONVERSION_ID, GENERATE_CONVERSION_ID),
    takeEvery(actions.PROCESS_ITEM_CONVERSION, PROCESS_ITEM_CONVERSION),
  ])
}
