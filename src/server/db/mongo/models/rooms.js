/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import Document from './document';

const RoomSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  name: { type:String }, // Human readable room name
  count: { type: Number, min: 0 },
  description: String, // Description of the room
  slugURL: { type:String }, //Slugified room name
  created: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
  items: [Document.schema]
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Room' collection in the MongoDB database
export default mongoose.model('Room', RoomSchema);
