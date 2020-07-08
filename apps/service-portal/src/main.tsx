import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Switch } from 'react-router-dom'
import { makeServer } from 'apps/service-portal/mirage-server'

import App from './app/App'
process.env.NODE_ENV !== 'production' && makeServer()

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
