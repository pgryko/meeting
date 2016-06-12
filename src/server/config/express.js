import express from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import methodOverride from 'method-override';
import unsupportedMessage from '../db/unsupportedMessage';
import { sessionSecret } from './secrets';
import { DB_TYPE, ENV } from './appConfig';
import { session as dbSession } from '../db';
import compression from 'compression';
import logger from 'morgan';
//Socket io stuff
import SocketIo from 'socket.io';
var gm = require('gm');
var uuid = require('node-uuid');


export default (app) => {
  app.set('port', (process.env.PORT || 8090));


  // X-Powered-By header has no functional value.
  // Keeping it makes it easier for an attacker to build the site's profile
  // It can be removed safely
  app.disable('x-powered-by');

  //Enable compression
  app.use(compression());
// serve our static stuff like index.css
  app.use(express.static('build/client'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  //Add csrf token to our session

  //Csrf token needs to be added to client side post
  //https://auth0.com/blog/2016/01/04/secure-your-react-and-redux-app-with-jwt-authentication/

  //Another approach would be to use JWT token
  //https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0#.ac8zf958f
  //http://stackoverflow.com/questions/21357182/csrf-token-necessary-when-using-stateless-sessionless-authentication
  app.use(methodOverride());

  // I am adding this here so that the Heroku deploy will work
  // Indicates the app is behind a front-facing proxy,
  // and to use the X-Forwarded-* headers to determine the connection and the IP address of the client.
  // NOTE: X-Forwarded-* headers are easily spoofed and the detected IP addresses are unreliable.
  // trust proxy is disabled by default.
  // When enabled, Express attempts to determine the IP address of the client connected through the front-facing proxy, or series of proxies.
  // The req.ips property, then, contains an array of IP addresses the client is connected through.
  // To enable it, use the values described in the trust proxy options table.
  // The trust proxy setting is implemented using the proxy-addr package. For more information, see its documentation.
  // loopback - 127.0.0.1/8, ::1/128
  // app.set('trust proxy', 'loopback');

  // Create a session middleware with the given options
  // Note session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
  // Options: resave: forces the session to be saved back to the session store, even if the session was never
  //                  modified during the request. Depending on your store this may be necessary, but it can also
  //                  create race conditions where a client has two parallel requests to your server and changes made
  //                  to the session in one request may get overwritten when the other request ends, even if it made no
  //                  changes(this behavior also depends on what store you're using).
  //          saveUnitialized: Forces a session that is uninitialized to be saved to the store. A session is uninitialized when
  //                  it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage
  //                  usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with
  //                  race conditions where a client makes multiple parallel requests without a session
  //          secret: This is the secret used to sign the session ID cookie.
  //          name: The name of the session ID cookie to set in the response (and read from in the request).
  //          cookie: Please note that secure: true is a recommended option.
  //                  However, it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies.
  //                  If secure is set, and you access your site over HTTP, the cookie will not be set.
  let sessionStore = null;
  if (!dbSession) {
    console.warn(unsupportedMessage('session'));
  } else {
    sessionStore = dbSession();
  }

  const sess = {
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    proxy: true, // The "X-Forwarded-Proto" header will be used.
    name: 'sessionId',
    // Add HTTPOnly, Secure attributes on Session Cookie
    // If secure is set, and you access your site over HTTP, the cookie will not be set
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: sessionStore
  };

  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log(`===>  Environment: ${ENV}`);
  console.log(`===>  Listening on port: ${app.get('port')}`);
  console.log(`===>  Using DB TYPE: ${DB_TYPE}`);
  if (ENV === 'production') {
    console.log('===> 🚦  Note: In order for authentication to work in production');
    console.log('===>           you will need a secure HTTPS connection');
    sess.cookie.secure = true; // Serve secure cookies
  }
  if (ENV === "development"){
    console.log("===>  Logging enabled");
    app.use(logger('dev'));
  }
  console.log('--------------------------');


  app.use(session(sess));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());

  /*
    Import from Jason's Socket io implemenation, this needs to be refactored
   */

  // Application state.
  var state = {
    title: 'Unipart Digital Comm Cell',
    items: [],
    selection: false,
    users: [],
    offer: undefined,
    answer: undefined,
  };


  var server = require('http').createServer(app);
  const io = new SocketIo(server, {path: '/api/chat'});

  // Accept file uploads.
  app.post('/upload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {

      var uploadWithExtension = function(extension) {
        return __dirname + '/static/uploads/' + uuid.v4() + extension;
      };

      var extension = path.extname(filename);
      var uploadPath = uploadWithExtension(extension);

      var fstream = fs.createWriteStream(uploadPath);
      file.pipe(fstream);
      fstream.on('close', function() {

        var completion = function(title, filename, cleanup) {

          // N.B. We explicitly specify the URL here (inc. 'index.html') to ensure this URL is different
          // to the top-level URL of the application itself. For some reason, when the two paths match,
          // Firefox will not load the contents of the iframes.
          // Doubtless there is 'correct' solution to this, but time is short.
          state.items.push({
            uuid: uuid.v4(),
            title: title,
            url: "/uploads/" + path.basename(filename),
            cleanup: cleanup
          });
          broadcastState();

        };

        if (extension == '.jpg' || extension == '.jpeg' || extension == '.png' || extension == '.gif') {

          var imagePath = uploadPath;
          gm(uploadPath).autoOrient().write(uploadPath, function() {
            completion(path.basename(filename, extension), uploadPath, function() {
              fs.unlink(imagePath, function(error) {
                if (error) {
                  console.log(error);
                }
              });
            });
            res.sendStatus(200);
          });

        } else if (extension == '.pdf') {

          var thumbnailPath = uploadWithExtension('.jpg');
          var command = util.format(
            'gs -dBATCH -dNOPAUSE -sDEVICE=jpeg -r200 -sOutputFile=%s %s',
            thumbnailPath, uploadPath);
          exec(command, function(error) {

            if (error) {
              console.log("Encountered an error generating PDF preview.");
              console.log(error);
              res.sendStatus(500);
              return;
            }

            completion(path.basename(filename, extension), thumbnailPath, function() {
              fs.unlink(uploadPath, function(error) {
                if (error) {
                  console.log(error);
                }
              });
              fs.unlink(thumbnailPath, function(error) {
                if (error) {
                  console.log(error);
                }
              });
            });

            res.sendStatus(200);

          });

        } else {
          console.log(util.format("Unsupported file with extension '%s'", extension));
          fs.unlink(uploadPath, function(error) {
            if (error) {
              console.log(error);
            }
          });
        }

      })
    })
  });

  var offerSocket = undefined;

  function broadcastState() {
    var clientState = update(state, {
      users: {$set: values(state.users)}
    });
    io.emit('server-set-state', JSON.stringify(clientState));
  }


  io.on('connection', function(socket) {


    socket.uuid = uuid.v4(),
      state.users[socket.uuid] = {
        uuid: socket.uuid,
        name: 'Jason Morley',
        email: 'jason.morley@inseven.co.uk',
        avatar: gravatar.imageUrl('jason.morley@inseven.co.uk', { "size": "128" })
      };
    broadcastState();
    //avatar: {$set: gravatar.imageUrl(user.email, { "size": "128" })},
    //avatar: {$set: gravatar.profile_url(user.email, { "size": "128" })},

    socket.on('disconnect', function() {

      delete state.users[socket.uuid];
      if (offerSocket == socket) {
        state.offer = undefined;
        state.answer = undefined;
      }
      broadcastState();

    }).on('client-set-user', parse_message(function(user) {

      state.users[socket].name = user.name;
      state.users[socket].email = user.email;
      broadcastState();

    })).on('client-add-item', parse_message(function(item) {

      item.uuid = uuid.v4();
      state.items.push(item);
      broadcastState();

    })).on('client-remove-item', parse_message(function(message) {

      var item = state.items[message.index];
      if (item.cleanup) {
        item.cleanup();
      }
      state.items.splice(message.index, 1);
      if (state.selection == item.uuid) {
        state.selection = false;
      }
      broadcastState();

    })).on('client-set-selection', parse_message(function(message) {

      state.selection = message.uuid;
      broadcastState();

    })).on('client-clear-selection', parse_message(function(message) {

      state.selection = false;
      broadcastState();

    })).on('client-call-add-ice-candidate', function(candidate) {

      socket.broadcast.emit('server-call-add-ice-candidate', candidate);

    }).on('client-call-set-offer', parse_message(function(offer) {

      state.offer = offer;
      offerSocket = socket;
      broadcastState();

    })).on('client-call-set-answer', parse_message(function(answer) {

      state.answer = answer;
      broadcastState();

    }));
  });

};
