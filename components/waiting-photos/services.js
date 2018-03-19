const fs = require('fs');
const probe = require('probe-image-size');

const WaitingPhotoDAO = require('./private/dao');

class WaitingPhoto {

    //jamanakavor
    getData() {
        return new Promise((resolve, reject) => {
            WaitingPhotoDAO.getData({}, {limit: 100,
                                        offset: 0}).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    getOnePhoto(query, options) {
        query = query || {};
        options = options || {};
        return new Promise((resolve, reject) => {
            WaitingPhotoDAO.getOneData(query, options).then(data => {
                console.log('dataaa====', data);
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    getCurrentPhoto(query, options) {
        query = query || {};
        options = options || {};
        return new Promise((resolve, reject) => {
            WaitingPhotoDAO.getData(query, {limit: 1,
                                        offset: 0}).then(data => {
                return resolve(data[0]);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    uploadPhoto(file, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
          if (!file || !file.buffer) {
              return reject({
                  //reason: ResponseErrors.VALIDATION_ERROR,
                  more_info: {message: 'Photo not provided.'}
              });
          }
          let image = probe.sync(file.buffer);
          if (!image) {
              return reject({
                  //error: ResponseErrors.THIRD_PARTY_ERROR,
                  more_info: {message:'Image file error'}
              });
          }

          WaitingPhotoDAO.insertData({
            image: file.buffer,
            content_type: image.content_type,
            mime: image.mime,
            width: image.width,
            height: image.height,
            size: file.size,
            user_id: options.user_id,
            photo_type: options.photo_type,
          }).then((photo) => {
            return resolve(photo);
          }).catch((err) => {
            return reject(err);
          })

        })
    }

    removePhoto(query, options) {
        query = query || {};
        options = options || {};
        return new Promise((resolve, reject) => {
            WaitingPhotoDAO.removeData(query, options).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }
}

module.exports = new WaitingPhoto();
