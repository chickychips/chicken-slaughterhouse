import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
  jwt: {
    getCuttingData: jwt.getCuttingData,
    generateCuttingId: jwt.generateCuttingId,
    processCutting: jwt.processCutting,
  },
}

export function* GENERATE_CUTTING_ID() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].generateCuttingId)
  if (response) {
    const { newId } = response
    yield put({
      type: 'cutting/SET_STATE',
      payload: {
        newCuttingId: newId,
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
  const response = yield call(mapAuthProviders[authProvider].getCuttingData)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'cutting/SET_STATE',
      payload: {
        cuttingData: response,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'cutting/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* PROCESS_CUTTING({ payload }) {
  console.log(payload)
  const {
    cuttingId,
    itemInput,
    itemOutput,
    inputQuantityWeight,
    inputQuantityVolume,
    referenceId,
  } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].processCutting,
    cuttingId,
    itemInput,
    itemOutput,
    inputQuantityWeight,
    inputQuantityVolume,
    referenceId,
    username,
  )
  if (response) {
    yield history.push('/')
    notification.success({
      message: 'Submit cutting succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'cutting/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_DATA, GET_DATA),
    takeEvery(actions.GENERATE_CUTTING_ID, GENERATE_CUTTING_ID),
    takeEvery(actions.PROCESS_CUTTING, PROCESS_CUTTING),
  ])
}
