import { apiMiddleware } from 'redux-api-middleware'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from 'reducers'

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(apiMiddleware)
)
export default store
