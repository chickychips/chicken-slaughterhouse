import actions from './actions'

const initialState = {
  expenseData: [],
  newExpenseId: '',
  loading: false,
}

export default function expenseReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
