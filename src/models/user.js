import mongoose, { Schema } from 'mongoose';

const User = new Schema({
  fullNames: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = mongoose.model('User', User);
export default userSchema;
