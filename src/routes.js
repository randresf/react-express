import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import App from './Components/App'
import Search from './Components/Search'

const Routes = (props) => (
  <HashRouter>
    <div className="app">
      <Route exact path="/" component={App} />
      <Route exact path="/results/:user1-:user2" component={Search} />
    </div>
  </HashRouter>
)

export default Routes
