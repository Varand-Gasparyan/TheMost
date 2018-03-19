const UserDAO = require('./private/dao');
const UserValidator = require('./private/validator');
const BaseValidator = require('./../core/validator');
const PhotoServices = require('./../photos/services');
const crypto = require('crypto');

class UserServices {

    getOneUser(query, options) {
        query = query || {};
        options = options || {};
        return new Promise((resolve, reject) => {
            UserDAO.getOneData(query, options).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    getUsers(limit, offset, query, options) {
        query = query || {};
        options = options || {};
        return new Promise((resolve, reject) => {
            UserDAO.getData(query, {limit: limit,
                                    offset: offset,
                                    populate: 'photos'}).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    addUser(user, file, options) {
        // stugel user-in kareli e avelacnel te che
        console.log('user ==', user, file);

        options = options || {};
        return new Promise((resolve, reject) => {
            let username = user.username;
            let email = user.email;
            let password = user.password;

            let us_response = UserValidator.validateUsername(username);
            if (us_response != BaseValidator.ErrorType.SUCCESS) {
                return reject(us_response);
            }
            let em_response = UserValidator.validateEmail(email);
            if (em_response != BaseValidator.ErrorType.SUCCESS) {
                return reject(em_response);
            }

            let ps_response = UserValidator.validatePassword(password);
            if (ps_response != BaseValidator.ErrorType.SUCCESS) {
                return reject(ps_response);
            }
            password = crypto.createHash('sha1').update(password + 'solt').digest('hex');
            user.password = password;

            UserDAO.getOneData({username: username}).then(data => {
                if (!data) {
                    if (!file) {
                        UserDAO.insertData(user, options).then(data => {
                            return resolve(data);
                        })
                    }
                    else {
                        console.log('file ===', file);
                        PhotoServices.uploadPhoto(file).then(photo => {
                            let avatar_id = photo._id;
                            user.avatar = avatar_id;
                            UserDAO.insertData(user, options).then(data => {
                                return resolve(data);
                            })
                        })
                    }
                }
                else {
                    return reject(BaseValidator.generateErrorMessage(BaseValidator.ErrorType.USERNAME_ALREADY_EXIST))
                }
            }).catch(err => {
                return reject(err);
            })


        })
    }

    updateUser(id, user, file, options) {
        user = user || {};
        options = options || {};

        return new Promise((resolve, reject) => {
            let username = user.username;
            let email = user.email;
            let password = user.password;

            let us_response = UserValidator.validateUpdateUsername(username);
            if (us_response != BaseValidator.ErrorType.SUCCESS) {
                return reject(us_response);
            }
            let em_response = UserValidator.validateUpdateEmail(email);
            if (em_response != BaseValidator.ErrorType.SUCCESS) {
                return reject(em_response);
            }

            /*let ps_response = UserValidator.validateUpdatePassword(password);
            if (ps_response != BaseValidator.ErrorType.SUCCESS) {
                return reject(ps_response);
            }
            password = crypto.createHash('sha1').update(password + 'solt').digest('hex');
            user.password = password;*/

            if (!file) {
                UserDAO.updateData(id, user, options).then(data => {
                    return resolve(data);
                }).catch(err => {
                    return reject(err);
                })
            }

            else {
                PhotoServices.uploadPhoto(file).then(data => {
                    let avatar_id = data._id;
                    user.avatar = avatar_id;
                    UserDAO.updateData(id, user, options).then(data => {
                        return resolve(data);
                    })
                }).catch(err => {
                    return reject(err);
                })
            }
        })
    }

    removeUser(query, options) {
        query = query || {};
        options = options || {};
        return new Promise((resolve, reject) => {
            UserDAO.removeData(query, options).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    authorizeNativeUser(username, password, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
            let us_response = UserValidator.validateUsername(username);
            if (us_response != BaseValidator.ErrorType.SUCCESS) {
                return reject(us_response);
            }
            let ps_response = UserValidator.validatePassword(password);
            if (ps_response != BaseValidator.ErrorType.SUCCESS) {
                return reject(ps_response);
            }
            UserDAO.getOneData({username: username}).then(data => {
                if (!data) {
                    return reject(BaseValidator.generateErrorMessage(BaseValidator.ErrorType.INVALID_USERNAME));
                }
                console.log('password == ', password);
                password = crypto.createHash('sha1').update(password + 'solt').digest('hex');
                if (password != data.password) {
                    return reject(BaseValidator.generateErrorMessage(BaseValidator.ErrorType.INVALID_PASSWORD));
                }
                let avatar_url = data.avatar ? ('http://127.0.0.1:1234/cdn/photos/' + data.avatar) : undefined;
                let result = {
                    username: data.username,
                    email: data.email,
                    key: data.key,
                    avatar: avatar_url,
                    id: data._id,
                }
                console.log('result == ', result);
                return resolve(result);
            }).catch(err => {
                return reject(err);
            })
        })
    }
}

module.exports = new UserServices();
