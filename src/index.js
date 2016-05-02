import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes/Routes';
import './static/sass/styles.scss';

/*
  Main entry point for client side app
 */
render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('app')
);
