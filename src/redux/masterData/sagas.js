import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
  jwt: {
    getSuppliers: jwt.getSuppliers,
    getCustomers: jwt.getCustomers,
    getMeasurementUnits: jwt.getMeasurementUnits,
    getItems: jwt.getItems,
    getExpenses: jwt.getExpenses,
    addSupplier: jwt.addSupplier,
    addCustomer: jwt.addCustomer,
    addMeasurementUnit: jwt.addMeasurementUnit,
    addItem: jwt.addItem,
    addExpense: jwt.addExpense,
  },
}

export function* GET_SUPPLIERS() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getSuppliers)
  if (response) {
    console.log('sagas', response.suppliers)
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        suppliers: response.suppliers,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_CUSTOMERS() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getCustomers)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        customers: response.customers,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_MEASUREMENT_UNITS() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getMeasurementUnits)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        measurementUnits: response.measurementUnits,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_ITEMS() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getItems)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        items: response.items,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_EXPENSES() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getExpenses)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        expenses: response.expenses,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* ADD_SUPPLIER({ payload }) {
  const { name, address, description } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].addSupplier,
    name,
    address,
    description,
    username,
  )
  if (response) {
    yield history.push('/master-data/supplier')
    notification.success({
      message: 'Add supplier succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* ADD_CUSTOMER({ payload }) {
  const { name, address, description } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].addCustomer,
    name,
    address,
    description,
    username,
  )
  if (response) {
    yield history.push('/master-data/customer')
    notification.success({
      message: 'Add customer succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* ADD_MEASUREMENT_UNIT({ payload }) {
  const { name, description } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].addMeasurementUnit,
    name,
    description,
    username,
  )
  if (response) {
    yield history.push('/master-data/measurement-unit')
    notification.success({
      message: 'Add measurement unit succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* ADD_ITEM({ payload }) {
  const { name, description, itemType, itemOutputType } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].addItem,
    name,
    description,
    itemType,
    itemOutputType,
    username,
  )
  if (response) {
    yield history.push('/master-data/item')
    notification.success({
      message: 'Add item succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* ADD_EXPENSE({ payload }) {
  const { name, measurementUnit, description } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].addExpense,
    name,
    measurementUnit,
    description,
    username,
  )
  if (response) {
    yield history.push('/master-data/expense')
    notification.success({
      message: 'Add expense succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'masterData/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SUPPLIERS, GET_SUPPLIERS),
    takeEvery(actions.GET_CUSTOMERS, GET_CUSTOMERS),
    takeEvery(actions.GET_MEASUREMENT_UNITS, GET_MEASUREMENT_UNITS),
    takeEvery(actions.GET_ITEMS, GET_ITEMS),
    takeEvery(actions.GET_EXPENSES, GET_EXPENSES),
    takeEvery(actions.ADD_SUPPLIER, ADD_SUPPLIER),
    takeEvery(actions.ADD_CUSTOMER, ADD_CUSTOMER),
    takeEvery(actions.ADD_MEASUREMENT_UNIT, ADD_MEASUREMENT_UNIT),
    takeEvery(actions.ADD_ITEM, ADD_ITEM),
    takeEvery(actions.ADD_EXPENSE, ADD_EXPENSE),
  ])
}
