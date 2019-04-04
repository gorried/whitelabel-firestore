import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from 'registerServiceWorker'

import { internal } from 'common/Endpoints'
import store from 'common/Store'
import Labeling from 'pages/Labeling'
import Login from 'pages/Login'

let { LABELING, ROOT } = internal.CLIENT
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={ROOT}
          component={() => <Login />}
        />
        <Route
          exact
          path={LABELING}
          component={() => <Labeling />}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
