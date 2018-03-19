const express = require('express');
const WaitingPhotoRouter = express.Router();
const WaitingPhotoServices = require('./services');
const multer = require('multer');
const upload = multer({
    limits: { fieldSize: 25 * 1024 * 1024 }
});

//all waiting_photo
WaitingPhotoRouter.get('/all', (req, res) => {
    console.log('tavar');
    WaitingPhotoServices.getData().then(data => {
        let result = data.map(data_item => {
            return {
                id: data_item._id
            }
        })
        return res.send(result);
    }).catch(err => {
        console.log('err == ', err);
        return res.send(err);
    })
})

WaitingPhotoRouter.get('/', (req, res) => {
    WaitingPhotoServices.getCurrentPhoto().then(photo => {
        let photo_url = photo._id ? ('http://127.0.0.1:1234/cdn/photos/' + photo._id) : undefined;
        let result = {
            id: photo._id,
            user_id: photo.user_id,
            photo_type: photo.photo_type,
            waiting_photo: photo_url
        }
        return res.send(result);
    }).catch(err => {
        console.log('err == ', err);
        return res.send(err);
    });
})

WaitingPhotoRouter.post('/:id/', upload.single('photo'), (req, res) => {
    console.log('photo type ========== ', req.body.photo_type);
    WaitingPhotoServices.uploadPhoto(req.file, {user_id: req.params.id, photo_type: req.body.photo_type}).then(photo => {
        return res.send(photo);
    }).catch(err => {
        console.log('err == ', err);
        return res.send(err);
    });
})

WaitingPhotoRouter.delete('/:id/', (req, res) => {
    WaitingPhotoServices.removePhoto({_id: req.params.id}).then(user => {
        return res.send(user);
    }).catch(err => {
        return res.send(err);
    })
})


module.exports = WaitingPhotoRouter;
