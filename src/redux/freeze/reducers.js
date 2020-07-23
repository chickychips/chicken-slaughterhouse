import actions from './actions'

const initialState = {
  freezeData: {},
  newFreezeId: '',
  loading: false,
}

export default function freezeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
