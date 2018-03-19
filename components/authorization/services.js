const UserServices = require('./../users/services');

class Authorization {

    auth(permission) {
        return function (req, res, next) {
            if (permission == 'optional') {
                return next();
            }
            else if (permission == 'user') {
                if (!req.query.key) return res.send('Please write key');
                UserServices.getOneUser({ key: req.query.key }).then(user => {
                    if (!user) {
                        //generate error
                        return res.send('error 1')
                    }
                    req.user = user;
                    return next();
                }).catch(err => {
                    return res.send(err)
                })
            }
            else if (permission == 'admin') {
                if (!req.query.key) return res.send('key error');
                UserServices.getOneUser({ key: req.query.key, role: 'admin' }).then(user => {
                    console.log('user == ', user);
                    if (!user) {
                        //generate error
                        return res.send('error 2')
                    }
                    req.user = user;
                    return next();
                }).catch(err => {
                    return res.send(err)
                })
            }
        }
    }
}

module.exports = new Authorization();
