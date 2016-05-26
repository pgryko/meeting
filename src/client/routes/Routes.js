import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import About from '../container/About';
import Header from '../container/Header'
import Home from '../container/Home';
import Features from '../container/Features';
import Help from '../container/Help';
import Contacts from '../container/Contacts';
// import auth from '../utils/auth';
import Login from '../components/Login';
import Logout from '../components/Logout';
import Dashboard from '../container/DashBoard';


function requireAuth(nextState, replace) {
  // if (!auth.loggedIn()) {
  //   replace({
  //     pathname: '/login',
  //     state: { nextPathname: nextState.location.pathname }
  //   })
  // }
}

module.exports = (
    // The Header contains the main menu links and will always show on each page
    <Route path="/" component={Header}>
      <IndexRoute component={Home}/>
      <Route path="/features" component={Features}/>
      <Route path="/help" component={Help}/>
      <Route path="/about" component={About}/>
      <Route path="/contacts" component={Contacts}/>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />

      {/*<Route path="/meeting" component={Meeting} /> */}
    </Route>
);
