import actions from './actions'

const initialState = {
  suppliers: [],
  customers: [],
  measurementUnits: [],
  items: [],
  expenses: [],
  outputTypeHideToggle: true,
  outputTypeRequired: false,
  loading: false,
}

export default function masterDataReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
