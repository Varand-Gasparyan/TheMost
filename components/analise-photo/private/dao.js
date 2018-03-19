const dbconnection = require('./../../core/dbconnection');
const BaseDAO = require('./../../core/base-dao');
const mongoose = require('mongoose');

require('./model');

let analise_photo_collection = dbconnection.model('analise_photos');

class AnalisePhotoDAO extends BaseDAO {

    constructor() {
        super(analise_photo_collection);
    }
}

module.exports = new AnalisePhotoDAO();
