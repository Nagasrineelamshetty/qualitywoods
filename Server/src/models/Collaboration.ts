// models/Collaboration.ts
import mongoose, { Schema } from 'mongoose';

const voteSchema = new Schema({
  userId: String,
  userName: String,
  vote: { type: String, enum: ['up', 'down'] },
  timestamp: { type: Date, default: Date.now },
});

const commentSchema = new Schema({
  id: String,
  userId: String,
  userName: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const itemSchema = new Schema({
  itemId: String,
  votes: [voteSchema],
  comments: [commentSchema],
});

const collaborationSchema = new Schema({
  sessionId: String,
  items: [itemSchema],
});

export default mongoose.model('Collaboration', collaborationSchema);
