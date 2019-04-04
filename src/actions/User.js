export const CHANGE_USER = '@@demo/CHANGE_USER'
export const LOGOUT_USER = '@@demo/LOGOUT_USER'

export const changeUser = user => ({
  type: CHANGE_USER,
  value: user
})

export const logOutUser = () => ({
  type: LOGOUT_USER
})
