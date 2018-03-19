const dbconnection = require('./../../core/dbconnection');
const BaseDAO = require('./../../core/base-dao');
const mongoose = require('mongoose');

require('./model');

let photoCollection = dbconnection.model('photos');

class PhotoDAO extends BaseDAO {

    constructor() {
        super(photoCollection);
    }
}

module.exports = new PhotoDAO();
