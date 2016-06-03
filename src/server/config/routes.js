/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
import path from 'path';
import { renderToString } from 'react-dom/server';


const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;

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

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }

  // send all requests to index.html so browserHistory in React Router works
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../build/client/index.html'))
  });
  //
  // console.log("Requests not matched");
  // // send all requests to index.html so browserHistory works
  // app.get('*', (req, res) => {
  //   match({ routes, location: req.url }, (err, redirect, props) => {
  //     if (err) {
  //       res.status(500).send(err.message);
  //     } else if (redirect) {
  //       res.redirect(redirect.pathname + redirect.search);
  //     } else if (props) {
  //       // hey we made it!
  //       const appHtml = renderToString(<RouterContext {...props} />);
  //       res.send(renderPage(appHtml));
  //     } else {
  //       res.status(404).send('Not Found');
  //     }
  //   });
  // });
};
