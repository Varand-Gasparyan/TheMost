const mongoose = require('mongoose');
const keygen = require('keygenerator');
const Schema = mongoose.Schema;

function generateAPIKey() {
    return (keygen._({ length: 2 }) + '-' + keygen._({ length: 6 })
        + '-' + keygen.number()
        + '-' + keygen._({ length: 6 })
        + '-' + keygen._({ length: 8 })).replace(/&/g, '');
}

let UserSchema = Schema({
    key: {
      type: String,
      index: { unique: true },
      default: generateAPIKey
    },
    username: {
      type: String,
      index: {unique: true},
      trim: false,
      lowercase: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      index: { unique: true, sparse: true },
      lowercase: true,
      default: null,
    },
    name: {
      type: String,
      default: null,
      trim: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    avatar: {
      type: Schema.ObjectId,
      ref: 'photos',
    },
    social: {
      provider: {
        type: String,
        enum: ['facebook', 'google', 'instagram', 'our'],
        default: 'our',
      },
      id: String,
      token: String,
    }
})

module.exports = mongoose.model('users', UserSchema);
