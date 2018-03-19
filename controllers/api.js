const UserRouter = require('./../components/users/api');
const PhotoRouter = require('./../components/photos/api');
const WaitingPhotoRouter = require('./../components/waiting-photos/api');
const AnalisePhotoRouter = require('./../components/analise-photo/api');
const CDNRouter = require('./../components/cdn/api');


class Api_V1 {
    initialize(app) {
        app.use('/api/users', UserRouter);
        app.use('/api/photos', PhotoRouter);
        app.use('/api/waiting-photo', WaitingPhotoRouter);
        app.use('/api/analise-photo', AnalisePhotoRouter);
        app.use('/cdn/photos', CDNRouter);
        app.get('/', (req, res) => {
            return res.send('Connect to home')
        })
    }
}

module.exports = new Api_V1();
