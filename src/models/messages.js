import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  names: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }

});

const message = mongoose.model('Message', MessageSchema);
export default message;
