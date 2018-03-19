const express = require('express');
const CDNRouter = express.Router();
const PhotoServices = require('./../photos/services');
const AnalisePhotoServices = require('./../analise-photo/services');

CDNRouter.get('/:id', (req, res) => {
    console.log('mtav es tavar texy', req.params.id);
    PhotoServices.getPhotoById(req.params.id).then(data => {
        res.setHeader('Content-Type', 'image/jpg');
        console.log('============== mtav es tavar texy', data);
        return res.send(data.image);
    }).catch(err => {
        console.log('err == ', err);
        return res.send(err);
    })
})

CDNRouter.get('/the-most/:id', (req, res) => {
    AnalisePhotoServices.getPhotoById(req.params.id).then(data => {
        res.setHeader('Content-Type', 'image/jpg');
        return res.send(data.image);
    }).catch(err => {
        console.log('err == ', err);
        return res.send(err);
    })
})

module.exports = CDNRouter;
