const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const Utility = require('./components/utility/services');

const api_v1 = require('./controllers/api');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(Utility.parseQuery);

api_v1.initialize(app);

console.log('CONNECTION !!!');
app.listen(1234);
