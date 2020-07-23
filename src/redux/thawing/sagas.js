import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
  jwt: {
    getThawingData: jwt.getThawingData,
    generateThawingId: jwt.generateThawingId,
    processThawing: jwt.processThawing,
  },
}

export function* GENERATE_THAWING_ID() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].generateThawingId)
  if (response) {
    const { newId } = response
    yield put({
      type: 'thawing/SET_STATE',
      payload: {
        newThawingId: newId,
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

export function* GET_DATA() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getThawingData)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'thawing/SET_STATE',
      payload: {
        thawingData: response,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'thawing/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* PROCESS_THAWING({ payload }) {
  console.log(payload)
  const { thawingId, referenceId, items } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].processThawing,
    thawingId,
    referenceId,
    items,
    username,
  )
  if (response) {
    yield history.push('/')
    notification.success({
      message: 'Thawing succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'thawing/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_DATA, GET_DATA),
    takeEvery(actions.GENERATE_THAWING_ID, GENERATE_THAWING_ID),
    takeEvery(actions.PROCESS_THAWING, PROCESS_THAWING),
  ])
}
