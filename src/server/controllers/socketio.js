//Socket io stuff
import uuid from 'node-uuid';
import Update from 'react-addons-update';
// import uploadMeetingDocument from '../models/uploadMeetingDocument';
import gm from 'gm';
import Util from 'util';
import fs from 'fs';
import path from 'path';

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


  function broadcastState(io,state, room='') {

    if (room !== ''){

      console.log("Broadcasting the following to room: " + room);
      console.log(state[room]);

      io.to(room).emit('server-set-state', JSON.stringify(state[room]));
    }
    else {
      let clientState = Update(state, {
        users: {$set: values(state.users)}
      });

      console.log("Broadcasting the following to all clients: ");
      console.log(clientState);

      io.emit('server-set-state', JSON.stringify(clientState));
    }

  }


//Pass state application state
exports = module.exports = function(io, state, app){
  var offerSocket = undefined;

  // Accept file uploads.
  // Accept file uploads.
  app.post('/upload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {

      var uploadWithExtension = function(extension) {
        return path.resolve(__dirname,'..','build','client','uploads',uuid.v4() + extension);
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
                  console.log("Error occured on gm");
                  console.log(error);
                }
              });
            });
            res.sendStatus(200);
          });

        } else if (extension == '.pdf') {

          var thumbnailPath = uploadWithExtension('.jpg');
          var command = Util.format(
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
          console.log(Util.format("Unsupported file with extension '%s'", extension));
          fs.unlink(uploadPath, function(error) {
            if (error) {
              console.log(error);
            }
          });
        }

      })
    })
  });

 io.on('connection', function(socket) {

   //Send message to user to ask which room they want to be in
   io.emit('server-request-room');

    socket.on('disconnect', function () {

      // delete state.users[socket.uuid];
      // if (offerSocket == socket) {
      //   state.offer = undefined;
      //   state.answer = undefined;
      // }
      // broadcastState(io,state);

    }).on('client-join-room', parse_message(function (roomName) {

      console.log("room name is: ");
      console.log(roomName);
      //Check if room exists in memory
      if ( !(roomName in state) ){
        //if not, add room to memory state
        var current_room = {
          title: '',
          items: [],
          selection: false,
          users: [],
        };
        state[roomName] = current_room;
      }

      // Then add user to room list
      // The user details will need to be pulled from session id and mongoose
      socket.uuid = uuid.v4();
      state[roomName].users[socket.uuid] = {
        uuid: socket.uuid,
        name: 'Random Name ' + socket.uuid,
        email: 'Random email ' + socket.uuid
      };

      console.log('Current state is: ');
      console.log(state);

      socket.join(roomName);
      // Update new user and broadcast server state to all users
      broadcastState(io, state,roomName);

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