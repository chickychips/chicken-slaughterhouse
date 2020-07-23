import actions from './actions'

const initialState = {
  items: [],
  suppliers: [],
}

export default function paramsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
