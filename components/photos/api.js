const express = require('express');
const PhotoServices = require('./services');
const PhotoRouter = express.Router();

const multer = require('multer');
const upload = multer();
const fs = require('fs');

PhotoRouter.get('/', (req, res) => {
    PhotoServices.getPhotos(req.query.limit, req.query.offset).then(photo => {
        return res.send(photo);
    }).catch(err => {
        return res.send(err);
    })
})

module.exports = PhotoRouter;
