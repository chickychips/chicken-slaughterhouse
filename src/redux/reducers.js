import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import purchase from './purchase/reducers'
import params from './params/reducers'
import cutting from './cutting/reducers'
import masterData from './masterData/reducers'
import storage from './storage/reducers'
import transaction from './transaction/reducers'
import thawing from './thawing/reducers'
import freeze from './freeze/reducers'
import expense from './expense/reducers'
import dashboard from './dashboard/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    purchase,
    params,
    cutting,
    masterData,
    storage,
    transaction,
    thawing,
    freeze,
    expense,
    dashboard,
  })
