/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

//Array containing allowed document types
//Used in mongoose validation
var documentTypes = ['url', 'etherpad', '3C', 'image/jpeg',
  'image/png', 'image/gif', 'application/pdf'];


const DocumentSchema = new mongoose.Schema({
  _id: {type: String, unique: true},
  contentType: {type: String, enum: documentTypes},
  title: String,
  date: {type: Date, default: Date.now},
  data: Buffer,
  url: String
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Document' collection in the MongoDB database
export default mongoose.model('Document', DocumentSchema);
