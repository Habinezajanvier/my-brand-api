import mongoose, { Schema } from 'mongoose';

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const article = mongoose.model('Article', articleSchema);
export default article;
