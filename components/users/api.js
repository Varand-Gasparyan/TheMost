const express = require('express');
const UserRouter = express.Router();
const UserServices = require('./services');
const Authorization = require('./../authorization/services');

const multer = require('multer');
const upload = multer({
    limits: { fieldSize: 25 * 1024 * 1024 }
});

UserRouter.get('/', Authorization.auth('optional'), (req, res) => {
    UserServices.getUsers(req.query.limit, req.query.offset).then(users => {
        let result = users.map(user => {
            console.log('== avatar == ', user.avatar);
            let avatar_url = user.avatar ? ('http://127.0.0.1:1234/cdn/photos/' + user.avatar) : undefined;
            return {
                username: user.username,
                name: user.name,
                role: user.role,
                email: user.email,
                avatar: avatar_url,
                id: user._id,
                social: user.social,
                key: user.key,
                password: user.password
            }
        })
        return res.send(result);
    }).catch(err => {
        return res.send(err);
    });
})

UserRouter.post('/', upload.single('avatar'), Authorization.auth('optional'), (req, res) => {
    let username = req.body.username || null;
    let name = req.body.name || null;
    let role = req.body.role || 'user';
    let email = req.body.email || null;
    let password = req.body.password || null

    let user = {
        username: username,
        name: name,
        role: role,
        email: email,
        password: password
    };

    UserServices.addUser(user, req.file).then(user => {
        return res.send(user);
    }).catch(err => {
        return res.send(err);
    })
})

UserRouter.put('/:id/', upload.single('avatar'), Authorization.auth('user'), (req, res) => {
    if (req.user.role != 'admin') {
        if (req.params.id != req.user._id) {
            return res.send('error in put request');
        }
    }
    //let avatar = (req.body && req.body.avatar) ? req.body.avatar : null;
    console.log('photo ==', req.file);

    let id = req.params.id;
    let username = req.body.username || undefined;
    let name = req.body.name || undefined;
    let role = req.body.role || undefined;
    let email = req.body.email || undefined;
    //let password = req.body.password || undefined;

    let update_user = {};

    if (username) {
        update_user.username = username;
    }
    if (name) {
        update_user.name = name;
    }
    if (role) {
        update_user.role = role;
    }
    if (email) {
        update_user.email = email;
    }
    //if (password) {
    //    update_user.password = password;
    //}
    UserServices.updateUser(id, update_user, req.file).then(user => {
        return res.send(user);
    }).catch(err => {
        return res.send(err);
    });
})

UserRouter.delete('/:id/', Authorization.auth('admin'), (req, res) => {
    UserServices.removeUser({_id: req.params.id}).then(user => {
        return res.send(user);
    }).catch(err => {
        return res.send(err);
    })
})

UserRouter.post('/natives/authorize', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    UserServices.authorizeNativeUser(username, password).then(data => {
        console.log('data == ', data);
        return res.send(data);
    }).catch(err => {
        console.log('error == ', err);
        return res.send(err);
    })
})

module.exports = UserRouter;
