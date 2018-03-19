const mongoose = require('mongoose');
const AppConstants = require('./../settings/constants');
mongoose.Promise = global.Promise;
module.exports = mongoose.createConnection(AppConstants.DB_CONNECTION);
