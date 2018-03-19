const AnalisePhotoDAO = require('./private/dao');
const WaitingPhotoServices = require('./../waiting-photos/services')
const UserServices = require('./../users/services');

const fs = require('fs');
const probe = require('probe-image-size');

var top_boy_like_count = 123;
var boy_like_count_global = 100;
var boy_like_count = 0;
var boy_timer_global = 60;
var boy_timer = 60;

class AnalisePhoto {

    constructor() {
        this.timerBoyCategory();
    }

    getPhotoById(id, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
            AnalisePhotoDAO.getDataById(id).then(photo => {
                return resolve(photo);
            }).catch(err => {
                return reject(err);
            })
        });
    }


    timerBoyCategory() {
        setInterval(() => {
              let time = boy_timer;
              --time;
              --boy_timer;
              if (time == -1){
                  //stugel tenal likeri qanakay meca te che global likeri qanakic
                  this.getTopAndCurrentPhoto('boy').then(data => {
                      let top_photo = data[0];
                      let current_photo = data[1];
                      if (current_photo.like_count >= current_photo.like_count_global) {
                          let new_global_like_count  = 2 * current_photo.like_count_global;
                          boy_timer = 3 * boy_timer;
                          AnalisePhotoDAO.updateData(current_photo.id, {like_count_global: new_global_like_count});
                      }
                      else {
                          this.setTopPhoto('boy').then(new_top => {
                              console.log('new_top == ', new_top);
                              this.setCurrentPhoto('boy').then(new_current => {
                                  console.log('new_current == ', new_current);
                                  boy_timer = 60;
                              })
                          })
                      }
                  })

              }

            }, 1000);
    }

    getTopAndCurrentPhoto(type) {
        if (!type) return 'photo type is undefined';

        return new Promise((resolve, reject) => {
            AnalisePhotoDAO.getOneData({category_type: type, photo_type: 'top'}).then(top_photo => {
                if (!top_photo) return reject('top photo get error');
                let photo_url = top_photo._id ? ('http://localhost:1234/cdn/photos/the-most/' + top_photo._id) : AppConstants.DEAFAULT_IMAGE_URL;
                let user_id = top_photo.user_id;
                UserServices.getOneUser({_id: user_id}).then(top_user => {
                    if (!top_user) {
                        console.log('== user chgtav ==');
                        return reject({err: '== user chgtav =='})
                    }
                    let avatar_url = top_user.avatar ? ('http://localhost:1234/cdn/photos/' + top_user.avatar) : AppConstants.DEAFAULT_AVATAR_URL;
                    let top_result = {
                        image: {uri: photo_url},
                        like_count: top_photo.like_count,
                        username: top_user.username || undefined,
                        avatar: {uri: avatar_url},
                        id: top_photo._id,
                        category_type: type,
                        photo_type: 'top',
                    }
                    AnalisePhotoDAO.getOneData({category_type: type, photo_type: 'current'}).then(current_photo => {
                        if (!current_photo) return reject('current photo get error');

                        let photo_url = current_photo._id ? ('http://localhost:1234/cdn/photos/the-most/' + current_photo._id) : AppConstants.DEAFAULT_IMAGE_URL;
                        let user_id = current_photo.user_id;
                        UserServices.getOneUser({_id: user_id}).then(current_user => {
                            if (!current_user) {
                                console.log('== user chgtav ==');
                                return reject({err: '== user chgtav =='})
                            }
                            let avatar_url = current_user.avatar ? ('http://localhost:1234/cdn/photos/' + top_user.avatar) : AppConstants.DEAFAULT_AVATAR_URL;
                            let current_result = {
                                image: {uri: photo_url},
                                like_count: current_photo.like_count,
                                like_count_global: current_photo.like_count_global,
                                username: current_user.username || undefined,
                                avatar: {uri: avatar_url},
                                id: current_photo._id,
                                category_type: type + '',
                                photo_type: 'current',
                            }
                            //sarqel funkcia vory kstana type u return kani time
                            current_result.time = boy_timer;
                            let result = [];
                            result.push(top_result);
                            result.push(current_result);
                            return resolve(result);
                        })
                    })

                })
            }).catch(err => {
                console.log('err == ', err);
                return reject(err);
            })
        })
    }

    setCurrentPhoto(type) {
        if (!type) return 'photo type is undefined';

        return new Promise((resolve, reject) => {
            WaitingPhotoServices.getOnePhoto({photo_type: type}).then(current_photo => {;
                let new_current_photo = {
                    image: current_photo.image,
                    content_type: current_photo.content_type,
                    mime: current_photo.mime,
                    size:  current_photo.size,
                    width: current_photo.width,
                    height:current_photo.height,
                    user_id: current_photo.user_id,
                    category_type: current_photo.photo_type,
                    photo_type: 'current',
                }
                AnalisePhotoDAO.removeData({category_type: type, photo_type: 'current'}).then(remove_current => {
                    AnalisePhotoDAO.insertData(new_current_photo).then(data => {
                        WaitingPhotoServices.removePhoto({_id: current_photo._id}).then(remove => {
                            return resolve(data);
                        })
                    })
                })
            }).catch(err => {
                console.log('err == ', err);
                return reject(err);
            })
        })

    }

    setTopPhoto(type) {
        if (!type) return 'photo type is undefined';
        return new Promise((resolve, reject) => {
            AnalisePhotoDAO.removeData({category_type: type, photo_type: 'top'}).then(remove_top => {
                AnalisePhotoDAO.getOneData({category_type: type, photo_type: 'current'}).then(current_photo => {
                    let new_top_photo = {
                        image: current_photo.image,
                        content_type: current_photo.content_type,
                        mime: current_photo.mime,
                        size:  current_photo.size,
                        width: current_photo.width,
                        height:current_photo.height,
                        user_id: current_photo.user_id,
                        category_type: current_photo.category_type,
                        like_count: current_photo.like_count,
                        photo_type: 'top',
                    }
                    AnalisePhotoDAO.insertData(new_top_photo).then(data => {
                        console.log('new inserted data == ', data);
                        return resolve(data);
                    });
                });
            }).catch(err => {
                return reject(err);
            })
        })

    }

    incrementLikeTopPhoto(type, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
            if (!type) {
                return reject('user id or type error');
            }
            AnalisePhotoDAO.getOneData({category_type: type, photo_type: 'top'}).then(data => {
                let like_count = data.like_count + 1;
                AnalisePhotoDAO.updateData(data._id, {like_count: like_count}).then(data => {
                    return resolve('SUCCESS');
                })
            }).catch(err => {
                console.log('err == ', err);
                return reject(err);
            })
        })
    }

    decrementLikeTopPhoto(type, options) {
        return new Promise((resolve, reject) => {
            if (!type) {
                return reject('user id or type error');
            }
            AnalisePhotoDAO.getOneData({category_type: type, photo_type: 'top'}).then(data => {
                let like_count = data.like_count - 1;
                AnalisePhotoDAO.updateData(data._id, {like_count: like_count}).then(data_top => {
                    AnalisePhotoDAO.getOneData({category_type: type, photo_type: 'current'}).then(data_current => {
                        if (data_current.like_count >= like_count) {
                            this.setTopPhoto(type).then(top_photo => {
                                this.setCurrentPhoto(type).then(current_photo => {
                                    return resolve('SUCCESS');
                                })
                            })
                        }
                        return resolve('SUCCESS');
                    })
                })
            }).catch(err => {
                console.log('err == ', err);
                return reject(err);
            })
        })
    }

    incrementLikeCurrentPhoto(type, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
            if (!type) {
                return reject('user id or type error');
            }
            AnalisePhotoDAO.getOneData({category_type: type, photo_type: 'current'}).then(data => {
                let like_count = data.like_count + 1;
                AnalisePhotoDAO.updateData(data._id, {like_count: like_count}).then(data_current => {
                    AnalisePhotoDAO.getOneData({category_type: type, photo_type: 'top'}).then(data_top => {
                        if (like_count >= data_top.like_count) {
                            this.setTopPhoto(type).then(top_photo => {
                                console.log('top_photo == ', top_photo);
                                this.setCurrentPhoto(type).then(current_photo => {
                                    console.log('current_photo == ', current_photo);
                                    return resolve('SUCCESS');
                                })
                            })
                        }
                        return resolve('SUCCESS');
                    })
                })
            }).catch(err => {
                console.log('err == ', err);
                return reject(err);
            })
        })
    }

    decrementLikeCurrentPhoto(type, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
            if (!type) {
                return reject('user id or type error');
            }
            AnalisePhotoDAO.getOneData({category_type: type, photo_type: 'current'}).then(data => {
                let like_count = data.like_count - 1;
                AnalisePhotoDAO.updateData(data._id, {like_count: like_count}).then(data => {
                    console.log('increment like count == ', data.like_count);
                    return resolve('SUCCESS');
                })
            }).catch(err => {
                console.log('err == ', err);
                return reject(err);
            })
        })
    }

    uploadPhoto(file, user_id, options) {
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

          AnalisePhotoDAO.insertData({
            image: file.buffer,
            content_type: image.content_type,
            mime: image.mime,
            width: image.width,
            height: image.height,
            size: file.size,
            user_id: user_id,
            photo_type: 'top',
            category_type: 'boy'
          }).then((photo) => {
            return resolve(photo);
          }).catch((err) => {
            return reject(err);
          })

        })
    }
}

module.exports = new AnalisePhoto();
