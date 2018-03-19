const dbconnection = require('./../../core/dbconnection');
const BaseDAO = require('./../../core/base-dao');
const mongoose = require('mongoose');

require('./model');

let userCollection = dbconnection.model('users');

class UserDAO extends BaseDAO {

    constructor() {
        super(userCollection);
    }
}

module.exports = new UserDAO();
