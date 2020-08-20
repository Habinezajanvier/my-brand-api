import mongoose, { Schema } from 'mongoose';

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true
  },
  author: {
    fullNames: String,
    _id: mongoose.Schema.Types.ObjectId
  },
  body: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  unlikes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const article = mongoose.model('Article', ArticleSchema);
export default article;
