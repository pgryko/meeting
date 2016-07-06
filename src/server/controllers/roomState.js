/**
 * Functions for controlling how room sessions are stored in memory
 * Currently room data is stored in express memory
 * Upon node restart all this data is lost
 * Upon first user connection to a specific room
 * Data needs to be loaded from the db, the general alogrithm is as follows
 *
 *    Check if room exists in memory
 *    If True, add user and broadcast updated state
 *    If False, () => async check db if room exists
 *    If exists, create room in memory & disk,
 *    Else return error
*/

//Imports for handleUpload
import gm from 'gm';
import Util from 'util';
import fs from 'fs';
import path from 'path';
import xm from 'xmimetype';
//For adding user to state
import uuid from 'node-uuid';


import { controllers } from '../db';

const roomsController = controllers && controllers.rooms;

/**
 * Function to add list of items to state
 */

export function addItemsToRoomState(roomstate,itemslist)
{
  console.log("Adding items to state");
  console.log("Received the following items");
  console.log(itemslist);
  for (var key in itemslist)
  {
    if (!itemslist.hasOwnProperty(key)) {
      //The current property is not a direct property of itemslist
      continue;
    }
    //Do your logic with the property here
    console.log(itemslist[key]);
    roomstate.items.push({
      uuid: itemslist[key]._id,
      title: itemslist[key].title,
      data: itemslist[key].date,
      url: itemslist[key].url
    });
    console.log("RoomState now contains");
    console.log( roomstate);
  }
}

/**
 * Function to initialise a room state
 *
 *  Check if room exists in memory
 *  If True, add user and broadcast updated state
 *  If False, () => async check db if room exists
 *  If exists, create room in memory & disk,
 *  Else return error
 *
 * @param room
 * @param callback
 */
export function initialiseRoomState(roomName,state,callback)
{
  console.log("Initialise room state started");
  //Check if room exists in DB
  roomsController.roomExists(roomName,
    (err,result)=>{
      console.log("Room exists in DB");
      //Room exists, sync files in db with those on disk
      if(result){
        console.log("Getting room list");
        roomsController.getRoomItems(roomName,
          (roomitems)=>{
            //TODO Load items to disk if necceary

            //Add items to state
            addItemsToRoomState(state[roomName],roomitems);
            callback();
          }
        );
      }
        //Else throw an error
      else{
        throw "Room does not exist";
      }
    });

}

/**
 * Add user to state and to a specific room
 */

export function addUserToRoom(socket,state,roomName)
{
  //Add user & brodcast state
  // Then add user to room list
  // The user details will need to be pulled from session id and mongoose
  socket.uuid = uuid.v4();
  state[roomName].users[socket.uuid] = {
    uuid: socket.uuid,
    name: 'Random Name ' + socket.uuid,
    email: 'Random email ' + socket.uuid
  };

  socket.join(roomName);

}


/**
 * Function to handle file upload
 */

export function handleUpload(req, res, state, io, broadCastState) {

  var roomName = req.get("room");

  console.log("Handle upload started, getting room name " + roomName);

  //NB add an error check here to see if room exists, else reject upload
  req.pipe(req.busboy);
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

    var fileUuid = uuid.v4();
    console.log("File uuid is");
    console.log(fileUuid);

    var uploadWithExtension = function(extension) {
      return path.resolve(__dirname,'..','..','build','client','uploads',fileUuid + extension);
    };

    var extension = path.extname(filename);
    var uploadPath = uploadWithExtension(extension);
    var title = path.basename(filename,extension);
    var url = "/uploads/" + fileUuid + extension;

    var fstream = fs.createWriteStream(uploadPath);
    file.pipe(fstream);

    console.log("Piping upload started");

    fstream.on('close', function() {
      console.log("Filestream close event");

      var completion = function(title, filename) {
        // N.B. We explicitly specify the URL here (inc. 'index.html') to ensure this URL is different
        // to the top-level URL of the application itself. For some reason, when the two paths match,
        // Firefox will not load the contents of the iframes.
        // Doubtless there is 'correct' solution to this, but time is short.
        console.log("completion started ");
        state[roomName].items.push({
          uuid: fileUuid,
          title: title,
          url: url
        });
      };

      console.log("Checking mine type");
      if (mimetype == xm.mimetypeOf('jpg') || mimetype == xm.mimetypeOf('png') || mimetype == xm.mimetypeOf('gif')) {

        var imagePath = uploadPath;
        gm(uploadPath).autoOrient().write(uploadPath, ()=> {

          completion(path.basename(filename, extension), uploadPath, ()=>{

            console.log("Completion finished");
            fs.unlink(imagePath, function(error) {
              console.log("Filesyem unliked");

              if (error) {
                console.log("Error occured on gm");
                console.log(error);
                res.sendStatus(500);
              }
            });
          });
          res.sendStatus(200);
          roomsController.addItem(roomName,fileUuid,mimetype,title,uploadPath,url,broadCastState(io,state,roomName));
        });

      }
      else if(mimetype == xm.mimetypeOf('pdf'))
      {
        var imagePath = uploadPath;
        //ToDo Remove gm, as gm should only be used with image types
        gm(uploadPath).autoOrient().write(uploadPath, ()=> {

          completion(path.basename(filename, extension), uploadPath, ()=>{
            console.log("Completion finished");
            fs.unlink(imagePath, function(error) {
              console.log("Filesyem unliked");

              if (error) {
                console.log("Error occured on gm");
                console.log(error);
                res.sendStatus(500);
              }
            });
          });
          res.sendStatus(200);
          roomsController.addItem(roomName,fileUuid,mimetype,title,uploadPath,url,broadCastState(io,state,roomName));
        });

      }
      else {
        console.log(Util.format("Unsupported file of type '%s'", mimetype));
        fs.unlink(uploadPath, function(error) {
          if (error) {
            console.log(error);
          }
        });
        res.status(400).send(Util.format("Unsupported file of type '%s'", mimetype));
      }

    });

  })
}

export default{
  initialiseRoomState,
  handleUpload,
  addUserToRoom
};
