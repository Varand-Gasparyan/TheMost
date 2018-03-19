const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AnalisePhotoSchema = Schema({
  image: Buffer,
  content_type: String,
  mime: String,
  size: Number,
  width: Number,
  height: Number,
  title: {
      type: String,
      default: null,
  },
  user_id: { type: Schema.ObjectId},
  like_count: {
      type: Number,
      default: 0
  },
  like_count_global: {
      type: Number,
      default: 60
  },
  category_type: {
    index: true,
    type: String,
    enum: ['boy', 'girl', 'nature', 'baby', 'animal', 'couple', 'funny', 'creative', 'art']
  },
  photo_type: {
    index: true,
    type: String,
    enum: ['top', 'current']
  },
  metadata: {
      created: { type: Date, default: Date.now },
      updated: { type: Date, default: Date.now }
  }
})

module.exports = mongoose.model('analise_photos', AnalisePhotoSchema);
