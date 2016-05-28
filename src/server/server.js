import axios from 'axios';
import compression from 'compression';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../client/store/configureStore';
import routes from '../client/routes/Routes';
import { ENV } from './config/appConfig';
import { connect } from './db';

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '8090'
};

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;


const app = module.exports = express();

app.use(compression());

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();


if (ENV === 'development') {
console.log("Server running in development mode")
}


// serve our static stuff like index.css
app.use(express.static('build/client'));

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>Unipart Digital Comm Cell</title>
    <link rel=stylesheet href=/css/index.css>
    <link rel="icon" href="/img/favicon.ico?v=2" />

    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `;
}

// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {

  const authenticated = req.isAuthenticated();
  const history = createMemoryHistory();
  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true
    }
  }, history);
  const routes = createRoutes(store);

  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      // hey we made it!
      // const appHtml = renderToString(<RouterContext {...props} />);
      // res.send(renderPage(appHtml));
      // This method waits for all render component
      // promises to resolve before returning to browser
      preRenderMiddleware(
        store.dispatch,
        props.components,
        props.params
      )
        .then(() => {
          const initialState = store.getState();
          const componentHTML = renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          );

          res.status(200).send(`
          <!doctype html>
          <html ${header.htmlAttributes.toString()}>
            <head>
              ${header.title.toString()}
              ${header.meta.toString()}
              ${header.link.toString()}
            </head>
            <body>
              <div id="app">${componentHTML}</div>
              <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
              <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
            </body>
          </html>
        `);
        })
        .catch((err) => {
          res.status(500).json(err);
        });

    } else {
      res.status(404).send('Not Found');
    }
  });
});


app.listen(clientConfig.port, function () {
  console.log('Express server running at localhost:' + clientConfig.port);
});
