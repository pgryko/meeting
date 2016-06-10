/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  id: String,
  text: String,
  count: { type: Number, min: 0 },
  name: { type:String, unique: true },
  date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Room' collection in the MongoDB database
export default mongoose.model('Room', RoomSchema);
