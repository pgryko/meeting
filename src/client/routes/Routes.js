import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import About from '../components/About';
import Header from '../container/Header'
import Home from '../components/Home';
import Features from '../components/Features';
import Help from '../components/Help'
import Contacts from '../components/Contacts'

module.exports = (
    // The Header contains the main menu links and will always show on each page
    <Route path="/" component={Header}>
      <IndexRoute component={Home}/>
      <Route path="/features" component={Features}/>
      <Route path="/help" component={Help}/>
      <Route path="/about" component={About}/>
      <Route path="/contacts" component={Contacts}/>
      {/*<Route path="/meeting" component={Meeting} /> */}
    </Route>
);
