var offerSocket = undefined;

function broadcastState() {
  var clientState = update(state, {
    users: {$set: values(state.users)}
  })
  io.emit('server-set-state', JSON.stringify(clientState));
}

// Somewhat inelegant function to bind an authenticated passport user into an incoming socket.
// There is presumably a much cleaner solution to this but it's unclear where to look.
function getSocketUser(socket, callback) {
  parser = cookieParser(config.secret);
  var req = {
    headers: {
      cookie: socket.handshake.headers.cookie
    }
  };
  parser(req, {}, function(error) {
    if (error) {
      callback(error, null);
    } else {
      store.get(req.signedCookies['connect.sid'], function(error, session) {
        if (error) {
          callback(error, null);
        } else if (session == undefined ||
          session.passport == undefined ||
          session.passport.user == undefined)  {
          callback("Missing passport data", null);
        } else {
          deserializeUser(session.passport.user, callback);
        }
      });
    }
  });
}

exports = module.exports = function(io) {

  io.on('connection', function(socket) {

    getSocketUser(socket, function(error, user) {

      if (error) {
        // TODO Reject the socket.
        return;
      }

      // Bind in the socket details.
      socket.uuid = uuid.v4();
      socket.user = user;

      // Update the list of connected users.
      state.users[socket.uuid] = update(user, {
        uuid: {$set: socket.uuid},
        avatar: {$set: gravatar.url(user.email, { "s": "128" },true)},
      });
      broadcastState();

    });
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
