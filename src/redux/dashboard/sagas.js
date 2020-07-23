import { all, takeEvery, put, call, select } from 'redux-saga/effects'
// import { notification } from 'antd'
// import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'

const mapAuthProviders = {
  jwt: {
    getDashboardData: jwt.getDashboardData,
  },
}

export function* GET_DATA() {
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].getDashboardData)
  if (response) {
    console.log('sagas', response)
    yield put({
      type: 'dashboard/SET_STATE',
      payload: {
        dashboardData: response,
      },
    })
  }
  if (!response) {
    yield put({
      type: 'dashboard/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_DATA, GET_DATA)])
}
