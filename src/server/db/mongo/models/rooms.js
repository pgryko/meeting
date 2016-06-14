/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  text: String, // Description of the room
  count: { type: Number, min: 0 },
  //name: { type:String, unique: true },
  name: { type:String }, // Human readable room name
  uri: { type:String }, //Slugified room name
  date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Room' collection in the MongoDB database
export default mongoose.model('Room', RoomSchema);
