const AppConstants = {

    DB_CONNECTION: '127.0.0.1:27017/the_most_backend',
    OFFSET_DEFAULT_VALUE: 0,
    LIMIT_DEFAULT_VALUE: 5,
    DEAFAULT_IMAGE_URL: 'https://cdn21.picsart.com/145116821005201.png',
    DEAFAULT_AVATAR_URL: 'https://cdn21.picsart.com/145116821005201.png',
    user: {
        USERNAME_MIN_LENGTH: 3,
        USERNAME_MAX_LENGTH: 25,
        PASSWORD_MIN_LENGTH: 6,
        PASSWORD_MAX_LENGTH: 50,
    }
}

module.exports = AppConstants;
