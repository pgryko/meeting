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
      var item = Document.create({
        _id: id, //File id
        contentType: contentType,
        title:title,
        date: Date.now(),
        data:  fs.readFileSync(filePath),
        url: url
      });
      console.log("Found room");
      console.log(room);
      if(!err){
        room.items.push(item);
        console.log("Setting modifiedOn");
        room.modifiedOn = Date.now();
        console.log("Saving room");
        room.save(function (err, room){
          if(err){
            console.log('Oh dear', err);
          } else {
            console.log('Item saved: ' + id);
            // res.redirect( '/project/' + req.body.projectID );
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
  Room.findById( roomName,
    function (err, room) {
      if(!err){
        console.log(room.items); // array of tasks
        // var thisTask = room.items.id(req.params.taskID);
        // console.log(thisTask); // individual task document
      }});
}

/**
 * Get room items
 */
export function getRoomItem(roomName,fileid){
  Room.findById( roomName,
    function (err, room) {
      if(!err){
        console.log(room.items); // array of tasks
        var thisTask = room.items._id(fileid);
        console.log(thisTask); // individual task document
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

export default {
  all,
  addRoom,
  update,
  remove,
  addItem
};
