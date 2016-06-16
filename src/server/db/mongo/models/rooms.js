/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  name: { type:String }, // Human readable room name
  count: { type: Number, min: 0 },
  //name: { type:String, unique: true },
  description: String, // Description of the room
  slugurl: { type:String }, //Slugified room name
  date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Room' collection in the MongoDB database
export default mongoose.model('Room', RoomSchema);
