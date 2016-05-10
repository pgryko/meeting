import express from 'express';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes/Routes';
import webpack from 'webpack';
import webpackDevConfig from '../webpack/webpack.client.config-dev';
import { ENV } from '../config/appconfig';

const app = module.exports = express();

app.use(compression());


if (ENV === 'development') {
  const compiler = webpack(webpackDevConfig);

  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: false, publicPath: webpackDevConfig.output.publicPath
  }));
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
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      // hey we made it!
      const appHtml = renderToString(<RouterContext {...props} />);
      res.send(renderPage(appHtml));
    } else {
      res.status(404).send('Not Found');
    }
  });
});


const PORT = process.env.PORT || 8090;
app.listen(PORT, function () {
  console.log('Production Express server running at localhost:' + PORT);
});
