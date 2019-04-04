import * as user from 'actions/User'

const initialState = {
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case user.CHANGE_USER:
      return {
        user: action.value
      }
    case user.LOGOUT_USER:
      return initialState
    default:
      return state
  }
}
