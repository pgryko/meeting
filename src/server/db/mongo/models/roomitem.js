/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const RoomItemSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  date: { type: Date, default: Date.now },
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Room' collection in the MongoDB database
export default mongoose.model('RoomItem', RoomItemSchema);
