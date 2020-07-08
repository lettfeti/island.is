import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './app/App'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
