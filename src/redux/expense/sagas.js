import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
  jwt: {
    getExpenseData: jwt.getExpenseData,
    generateExpenseId: jwt.generateExpenseId,
    addExpenseData: jwt.addExpenseData,
  },
}

export function* GENERATE_EXPENSE_ID() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].generateExpenseId)
  if (response) {
    const { newId } = response
    console.log('newid', newId)
    yield put({
      type: 'expense/SET_STATE',
      payload: {
        newExpenseId: newId,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'expense/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_DATA() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getExpenseData)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'expense/SET_STATE',
      payload: {
        expenseData: response.expense,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'expense/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* ADD_EXPENSE({ payload }) {
  const { expenseId, expenseCutting, expenseFreeze, expenseThawing } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].addExpenseData,
    expenseId,
    expenseCutting,
    expenseFreeze,
    expenseThawing,
    username,
  )
  if (response) {
    yield history.push('/')
    notification.success({
      message: 'Add expense succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'expense/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_DATA, GET_DATA),
    takeEvery(actions.GENERATE_EXPENSE_ID, GENERATE_EXPENSE_ID),
    takeEvery(actions.ADD_EXPENSE, ADD_EXPENSE),
  ])
}
