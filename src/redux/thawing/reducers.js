import actions from './actions'

const initialState = {
  thawingData: [],
  newThawingId: '',
  loading: false,
}

export default function thawingReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
