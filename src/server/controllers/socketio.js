//Socket io stuff
import uuid from 'node-uuid';
import Update from 'react-addons-update';
// import uploadMeetingDocument from '../models/uploadMeetingDocument';
import {exec} from 'child_process';
import {handleUpload, initialiseRoomState, addUserToState} from './roomState';

//NB these need to be removed when disconnect is refactored
import {controllers} from '../db';
const roomsController = controllers && controllers.rooms;

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

function broadcastState(io, state, room = '') {

  if (room !== '') {

    console.log("Broadcasting the following to room: " + room);
    try {
      io.to(room).emit('server-set-state', state[room]);
      console.log(state[room]);
    }
    catch (err) {
      if (err) {
        console.log(err);
      }
    }


    io.to(room).emit('server-set-state', state[room]);
  }
  else {
    let clientState = Update(state, {
      users: {$set: values(state.users)}
    });

    console.log("Broadcasting the following to all clients: ");
    console.log(clientState);

    io.emit('server-set-state', clientState);
  }

}


//Pass state application state
exports = module.exports = function (io, state, app) {
  var offerSocket = undefined;

  // Accept file uploads. File uploads are currently controlled by REST/POST
  // Rather than socketio stream
  app.post('/upload', (res, req) => {
    handleUpload(res, req, state, io, broadcastState)
  });

  io.on('connection', function (socket) {

    //Send message to user to ask which room they want to be in
    io.emit('server-request-room');

    socket.on('disconnect', function () {

      //Inefficient way of removing user from state
      //I suspect that this is handled automatically by socket io
      for (var room in state) {
        // skip loop if the property is from prototype
        if (!state.hasOwnProperty(room)) continue;

        if (typeof state[room].users[socket.uuid] != 'undefined') {
          delete state[room].users[socket.uuid];
          broadcastState(io, state[room], room);
          break;
        }
      }

    }).on('client-join-room', function (roomName) {

      // var roomName = JSON.stringify(name);

      /* Flow should be as follows:
       *  Check if room exists in memory
       *  If True, add user and broadcast updated state
       *  If False, () => async check db if room exists
       *  If exists, create room in memory & disk,
       *  Else return error
       */

      //Check if room exists in memory
      if ((roomName in state)) {
        console.log("Room " + roomName + " exists in state");
        addUserToState(socket, state, roomName, (err) => {
          if (err) console.log("Error occured in adding user");
          else {
            broadcastState(io, state, roomName);
            console.log("User added to state")
          }
        });
      }
      else {
        //if not, add room to memory state
        var current_room = {
          title: '',
          items: [],
          selection: false,
          users: [],
        };
        state[roomName] = current_room;
        console.log("Room " + roomName + " added to state state");

        //Load room state from db to memory
        initialiseRoomState(roomName, state,
          (err, data)=> {
            console.log("Initialise room state finished");

            if (err) console.log("Error occured in initalising room" + error);
            else {
              addUserToState(socket, state, roomName,
                (err) => {
                  console.log("User added to state");
                  if (err) console.log("Error occured in adding user to state" + error);
                  else {
                    console.log("Broadcasting state");
                    broadcastState(io, state, roomName);
                    console.log("User added to state")
                  }
                });
            }
          });
      }

    }).on('client-add-item', function (message) {

      message.item.uuid = uuid.v4();
      state[message.room].items.push(message.item);
      broadcastState(io, state, message.room);

    }).on('client-remove-item', function (message) {

      var item = state[message.room].items[message.index];
      if (item.cleanup) {
        item.cleanup();
      }
      state[message.room].items.splice(message.index, 1);
      if (state[message.room].selection == item.uuid) {
        state[message.room].selection = false;
      }
      roomsController.removeItem(message.room, item.uuid);
      broadcastState(io, state, message.room);

    }).on('client-set-selection', function (message) {

      state[message.room].selection = message.uuid;
      broadcastState(io, state, message.room);

    }).on('client-clear-selection', function (message) {

      state[message.room].selection = false;
      broadcastState(io, state, message.room);

    });
  })
};
