import React from 'react'
import Home from './views/Home'
import Detail from './views/Detail'
import Edit from './views/Edit'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const RouterMap = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/detail">
          <Detail />
        </Route>
        <Route exact path="/edit">
          <Edit />
        </Route>
      </Switch>
    </Router>
  )
}

export default RouterMap
