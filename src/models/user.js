import mongoose, { Schema } from 'mongoose';

const User = new Schema({
  platform: {
    type: String,
    enum: ['google', 'email']
  },
  profileId: String,
  fullNames: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photoUrl: String,
  password: {
    type: String,
    required() { return this.platform === 'email'; }
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  bio: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = mongoose.model('User', User);
export default userSchema;
