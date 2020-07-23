import actions from './actions'

const initialState = {
  transactionHistory: [],
  transactionDetail: [],
  transactionData: [],
  salesOrderId: '',
  loading: false,
}

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
