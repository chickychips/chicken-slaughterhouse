import actions from './actions'

const initialState = {
  cuttingData: [],
  newCuttingId: '',
  loading: false,
}

export default function cuttingReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
