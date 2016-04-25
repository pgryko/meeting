import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from '../components/App'
import About from '../components/About'
import Repos from '../components/Repos'
import Repo from '../components/Repo'
import Header from '../container/Header'
import Home from '../components/Home'


module.exports = (
  <Route path="/" component={Header}>
    <IndexRoute component={Home}/>
    <Route path="/repos" component={Repos}>
      <Route path="/repos/:userName/:repoName" component={Repo}/>
    </Route>
    <Route path="/about" component={About}/>
  </Route>
)
