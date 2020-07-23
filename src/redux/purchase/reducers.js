import actions from './actions'

const initialState = {
  purchaseData: [],
  newPurchaseOrderId: '',
  loading: false,
}

export default function purchaseReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
