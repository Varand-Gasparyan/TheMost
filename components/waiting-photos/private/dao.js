const dbconnection = require('./../../core/dbconnection');
const BaseDAO = require('./../../core/base-dao');
const mongoose = require('mongoose');

require('./model');

let waitngPhotoCollection = dbconnection.model('waiting_photos')

class WaitingPhotoDAO extends BaseDAO {

    constructor() {
        super(waitngPhotoCollection)
    }
}

module.exports = new WaitingPhotoDAO();
