const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PhotoSchema = Schema({
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
  entity_id: { type: Schema.ObjectId, index: true },
  photo_type: {
    index: true,
    type: String,
    enum: ['boy', 'girl', 'nature', 'baby', 'animal', 'couple', 'funny', 'creative', 'art']
  },
  metadata: {
      created: { type: Date, default: Date.now },
      updated: { type: Date, default: Date.now }
  }
})

module.exports = mongoose.model('waiting_photos', PhotoSchema);
