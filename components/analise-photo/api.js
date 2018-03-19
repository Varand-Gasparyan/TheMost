const express = require('express');
const AnalisePhotoRouter = express.Router();
const AnalisePhotoServices = require('./services');
const multer = require('multer');
const upload = multer({
    limits: { fieldSize: 25 * 1024 * 1024 }
});

AnalisePhotoRouter.get('/', (req, res) => {
    let category_type = req.query.type || undefined;

    AnalisePhotoServices.getTopAndCurrentPhoto(category_type).then(data => {
        return res.send(data);
    }).catch(err => {
        console.log('err == ', err);
        return res.send(err)
    })
})

AnalisePhotoRouter.post('/', upload.single('photo'), (req, res) => {
    let user_id = req.body.user_id;
    console.log('iser_id == ', user_id);
    AnalisePhotoServices.uploadPhoto(req.file, user_id).then(data => {
        return res.send(data);
    }).catch(err => {
        console.log('err == ', err);
        return res.send(err);
    })
})

AnalisePhotoRouter.get('/like-top', (req, res) => {
    let category_type = req.query.type || undefined;
    console.log('type == ',category_type);
    AnalisePhotoServices.incrementLikeTopPhoto(category_type).then(data => {
        console.log('like top == ', data);
        return res.send(data);
    });
})

AnalisePhotoRouter.get('/unlike-top', (req, res) => {
    let category_type = req.query.type || undefined;
    AnalisePhotoServices.decrementLikeTopPhoto(category_type).then(data => {
        console.log('unlike top == ', data);
        return res.send(data);
    });
})

AnalisePhotoRouter.get('/like-current', (req, res) => {
    let category_type = req.query.type || undefined;
    let data = AnalisePhotoServices.incrementLikeCurrentPhoto(category_type).then(data => {
        console.log('like current == ', data);
        return res.send(data);
    });
})

AnalisePhotoRouter.get('/unlike-current', (req, res) => {
    let category_type = req.query.type || undefined;
    let data = AnalisePhotoServices.decrementLikeCurrentPhoto(category_type).then(data => {
        console.log('unlike current == ', data);
        return res.send(data);
    });
})

module.exports = AnalisePhotoRouter;
