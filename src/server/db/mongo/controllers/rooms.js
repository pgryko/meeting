import _ from 'lodash';
import Room from '../models/rooms';
import fs from 'fs';
import Document from '../models/document';

/**
 * List
 */
export function all(req, res) {
  Room.find({}).exec((err, rooms) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(rooms);
  });
}

/**
 * Add a Room
 */
export function addRoom(req, res) {
  Room.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

/**
 * Update a room
 */
export function update(req, res) {
  const query = { id: req.params.id };
  const isIncrement = req.body.isIncrement;
  const isFull = req.body.isFull;
  const omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  const data = _.omit(req.body, omitKeys);

  if (isFull) {
    Room.findOneAndUpdate(query, data, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  } else {
    Room.findOneAndUpdate(query, { $inc: { count: isIncrement ? 1 : -1 } }, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  }
}

/**
 * Add an item to the room
 */
export function addItem(roomName,id,contentType,title,filePath,url){
  console.log("Running add item");
  Room.findOne( {slugURL:roomName},
    function (err, room) {
      if(!err){
        room.items.push({
          _id: id, //File id
          contentType: contentType,
          title:title,
          date: Date.now(),
          data:  fs.readFile(filePath),
          url: url
        });
        room.modifiedOn = Date.now();
        room.save(function (err, room){
          if(err){
            console.log('Error occurred on file save', err);
          } else {
            console.log('Item saved: ' + id);
          }
        });
      }
    }
  );
}

/**
 * Get room items
 */
export function getRoomItems(roomName){
  Room.findOne( {slugURL:roomName},
    function (err, room) {
      if(!err){
        console.log(room.items); // array of tasks
        // var thisTask = room.items.id(req.params.taskID);
        // console.log(thisTask); // individual task document
      }});
}

/**
 * Get room item
 */
export function getRoomItem(roomName,fileid){
  Room.findOne( {slugURL:roomName},
    function (err, room) {
      if(!err){
        console.log(room.items); // array of tasks
        var thisTask = room.items._id(fileid);
        console.log(thisTask); // individual task document
      }});
}

/**
 * Get room item
 */
export function removeItem(roomName,fileid){
  Room.findOne( {slugURL:roomName}, (err, room) => {

      if (err) {
        console.log('Failed to find item');
        return res.status(500).send('We failed to find item for some reason');
      }

      if(!err){
        room.items.pull(fileid).remove();
        room.save();
        if (err) {
          console.log('Error on delete');
          return res.status(500).send('We failed to delete item for some reason');
        }
        console.log("Removed item from db");
      }});
}

/**
 * Remove a room
 */
export function remove(req, res) {
  const query = { id: req.params.id };
  Room.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

/**
 * Get room
 */
export  function roomExists(roomName,callback){
  Room.findOne({slugURL:roomName}, (err,room) =>{
      var b_exists = !(Object.keys(room).length === 0);
      callback(err,b_exists);
  }
  );

}

// export  function roomExists(roomName,callback){
//   Room.find({slugURL:roomName}, (err,room) =>{
//       callback(null, !(Object.keys(room).length === 0) ) ;
//     }
//   ).limit(1);
//
// }
export default {
  all,
  addRoom,
  update,
  remove,
  addItem,
  removeItem,
  getRoomItems,
  getRoomItem,
  roomExists,
};
