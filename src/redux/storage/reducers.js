import actions from './actions'

const initialState = {
  freshItemStock: [],
  frozenItemStock: [],
  itemsToBeDelivered: [],
  deliveryId: '',
  conversionId: '',
  loading: false,
}

export default function storageReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
