import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
  jwt: {
    getFreezeData: jwt.getFreezeData,
    generateFreezeId: jwt.generateFreezeId,
    processFreeze: jwt.processFreeze,
  },
}

export function* GENERATE_FREEZE_ID() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].generateFreezeId)
  if (response) {
    const { newId } = response
    yield put({
      type: 'freeze/SET_STATE',
      payload: {
        newFreezeId: newId,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'freeze/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_DATA() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getFreezeData)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'freeze/SET_STATE',
      payload: {
        freezeData: response.freezeData,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'freeze/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* PROCESS_FREEZE({ payload }) {
  const { freezeId, items } = payload

  const { username } = yield select(state => state.user)
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(
    mapAuthProviders[authProvider].processFreeze,
    freezeId,
    items,
    username,
  )
  if (response) {
    yield history.push('/')
    notification.success({
      message: 'Freeze process succeed',
    })
  }
  if (!response) {
    yield put({
      type: 'freeze/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_DATA, GET_DATA),
    takeEvery(actions.GENERATE_FREEZE_ID, GENERATE_FREEZE_ID),
    takeEvery(actions.PROCESS_FREEZE, PROCESS_FREEZE),
  ])
}
