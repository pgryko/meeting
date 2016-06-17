//Socket io stuff
import SocketIo from 'socket.io';
import uuid from 'node-uuid';
import Update from 'react-addons-update';

/*
 Import from Jason's Socket io implementation, this needs to be refactored
 */

function values(object) {
  var items = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      items.push(Update(object[key], {}));
    }
  }
  return items;
}

function parse_message(callback) {
  return function(message) {
    callback(JSON.parse(message));
  }
}


  function broadcastState(io,state) {
    var clientState = Update(state, {
      users: {$set: values(state.users)}
    });
    io.emit('server-set-state', JSON.stringify(clientState));
  }

  //Requests information on user name and which room their in
  function requestUserInfo(io) {
    io.emit('server-request-user-info' );
  }


//Pass state application state
exports = module.exports = function(io, state){
  var offerSocket = undefined;

 io.on('connection', function(socket) {

    //Get socket id
    socket.uuid = uuid.v4(),
      state.users[socket.uuid] = {
        uuid: socket.uuid,
        name: 'Random Name' + uuid,
        email: 'Random email' + uuid,
      };

    //Get user info and room name

    requestUserInfo(io);
    //Join specific room
    // socket.join('some room');

    // Update new user and broadcast server state to all users

    broadcastState(io,state);

    socket.on('disconnect', function () {

      delete state.users[socket.uuid];
      if (offerSocket == socket) {
        state.offer = undefined;
        state.answer = undefined;
      }
      broadcastState(io,state);

    }).on('client-set-user', parse_message(function (user) {

      console.log("user name is ");
      console.log(user);
      // state.users[socket].name = user.name;
      // state.users[socket].email = user.email;
      broadcastState(io,state);

    })).on('client-add-item', parse_message(function (item) {

      item.uuid = uuid.v4();
      state.items.push(item);
      broadcastState(io,state);

    })).on('client-remove-item', parse_message(function (message) {

      var item = state.items[message.index];
      if (item.cleanup) {
        item.cleanup();
      }
      state.items.splice(message.index, 1);
      if (state.selection == item.uuid) {
        state.selection = false;
      }
      broadcastState(io,state);

    })).on('client-set-selection', parse_message(function (message) {

      state.selection = message.uuid;
      broadcastState(io,state);

    })).on('client-clear-selection', parse_message(function (message) {

      state.selection = false;
      broadcastState(io,state);

    })).on('client-call-add-ice-candidate', function (candidate) {

      socket.broadcast.emit('server-call-add-ice-candidate', candidate);

    }).on('client-call-set-offer', parse_message(function (offer) {

      state.offer = offer;
      offerSocket = socket;
      broadcastState(io,state);

    })).on('client-call-set-answer', parse_message(function (answer) {

      state.answer = answer;
      broadcastState(io,state);

    }));
  })
}
