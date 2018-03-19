const fs = require('fs');
const probe = require('probe-image-size');

const PhotoDAO = require('./private/dao');

class PhotoServices {

    getPhotos(limit, offset, query, options) {
        query = query || {};
        options = options || {};
        return new Promise((resolve, reject) => {
            PhotoDAO.getData(query, {limit: limit,
                                    offset: offset}).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    getPhotoById(id, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
            PhotoDAO.getDataById(id).then(photo => {
                return resolve(photo);
            }).catch(err => {
                return reject(err);
            })
        });
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

          PhotoDAO.insertData({
            image: file.buffer,
            content_type: image.content_type,
            mime: image.mime,
            width: image.width,
            height: image.height,
            size: file.size,
            user_id: options.user_id || undefined
          }).then((photo) => {
            return resolve(photo);
          }).catch((err) => {
            return reject(err);
          })

        })
        }
}

module.exports = new PhotoServices();
