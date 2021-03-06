//Socket io stuff
import uuid from 'node-uuid';
import Update from 'react-addons-update';
// import uploadMeetingDocument from '../models/uploadMeetingDocument';
import gm from 'gm';
import Util from 'util';
import fs from 'fs';
import path from 'path';
import {exec} from 'child_process';
import xm from 'xmimetype';
import { controllers } from '../db';

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

  function broadcastState(io,state, room='') {

    if (room !== ''){

      console.log("Broadcasting the following to room: " + room);

      try{
        io.to(room).emit('server-set-state', state[room]);
        console.log(state[room]);
      }
      catch(err)
      {
        if(err){
          console.log(err);
        }
      }

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
exports = module.exports = function(io, state, app){
  var offerSocket = undefined;

  // Accept file uploads.
  app.post('/upload', function(req, res) {

    var roomName = req.get("room");

    //NB add an error check here to see if room exists, else reject upload
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

      var fileUuid = uuid.v4();


      var uploadWithExtension = function(extension) {
        return path.resolve(__dirname,'..','..','build','client','uploads',fileUuid + extension);
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
          state[roomName].items.push({
            uuid: fileUuid,
            title: title,
            url: "/uploads/" + path.basename(filename),
            cleanup: cleanup
          });
          broadcastState(io,state,roomName);

        };


        if (mimetype == xm.mimetypeOf('jpg') || mimetype == xm.mimetypeOf('png') || mimetype == xm.mimetypeOf('gif') || mimetype == xm.mimetypeOf('pdf')) {

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

        } else {
          console.log(Util.format("Unsupported file of type '%s'", mimetype));
          fs.unlink(uploadPath, function(error) {
            if (error) {
              console.log(error);
            }
          });
          res.status(400).send(Util.format("Unsupported file of type '%s'", mimetype));
        }

      });

      roomsController.addItem(roomName,fileUuid,mimetype,'title',uploadPath,"/uploads/");
    })
  });

 io.on('connection', function(socket) {

   //Send message to user to ask which room they want to be in
   io.emit('server-request-room');

    socket.on('disconnect', function () {

      //Inefficient way of removing user from state
      //I suspect that this is handled automatically by socket io
      for (var room in state)
      {
        // skip loop if the property is from prototype
        if (!state.hasOwnProperty(room)) continue;

        if( typeof state[room].users[socket.uuid] != 'undefined'  )
        {
          delete state[room].users[socket.uuid];
          broadcastState(io,state[room],room);
          break;
        }
      }

    }).on('client-join-room', function (roomName) {

      // var roomName = JSON.stringify(name);

      //Check if room exists in DB
      console.log("This room should exist");
      console.log(roomsController.roomExists(roomName));

      console.log("This room should not exist");
      console.log(roomsController.roomExists("gfaff"));
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

      console.log("Room items are");
      roomsController.getRoomItems(roomName);

      // Then add user to room list
      // The user details will need to be pulled from session id and mongoose
      socket.uuid = uuid.v4();
      state[roomName].users[socket.uuid] = {
        uuid: socket.uuid,
        name: 'Random Name ' + socket.uuid,
        email: 'Random email ' + socket.uuid
      };

      socket.join(roomName);
      // Update new user and broadcast server state to all users
      broadcastState(io, state,roomName);

    }).on('client-add-item', function (message) {

      message.item.uuid = uuid.v4();
      state[message.room].items.push(message.item);
      broadcastState(io,state,message.room);

    }).on('client-remove-item', function (message) {

      var item = state[message.room].items[message.index];
      if (item.cleanup) {
        item.cleanup();
      }
      state[message.room].items.splice(message.index, 1);
      if (state[message.room].selection == item.uuid) {
        state[message.room].selection = false;
      }
      roomsController.removeItem(message.room,item.uuid);
      broadcastState(io,state,message.room);

    }).on('client-set-selection', function (message) {

      state[message.room].selection = message.uuid;
      broadcastState(io,state,message.room);

    }).on('client-clear-selection', function (message) {

      state[message.room].selection = false;
      broadcastState(io,state,message.room);

    });
  })
};
