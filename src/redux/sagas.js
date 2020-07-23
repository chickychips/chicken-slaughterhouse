import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import purchase from './purchase/sagas'
import params from './params/sagas'
import cutting from './cutting/sagas'
import masterData from './masterData/sagas'
import storage from './storage/sagas'
import transaction from './transaction/sagas'
import thawing from './thawing/sagas'
import freeze from './freeze/sagas'
import expense from './expense/sagas'
import dashboard from './dashboard/sagas'

export default function* rootSaga() {
  yield all([
    user(),
    menu(),
    settings(),
    purchase(),
    params(),
    cutting(),
    masterData(),
    storage(),
    transaction(),
    thawing(),
    freeze(),
    expense(),
    dashboard(),
  ])
}
