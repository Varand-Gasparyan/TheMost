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
  metadata: {
      created: { type: Date, default: Date.now },
      updated: { type: Date, default: Date.now }
  }
})

module.exports = mongoose.model('photos', PhotoSchema);
