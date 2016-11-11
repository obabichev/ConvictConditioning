var express = require('express');

var app = express();

var credentials = require('./credentials');

require('./boot/index')(app);
require('./routes/index')(app);

var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: {keepAlive: 1}
    }
};

switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    default:
        throw new Error('Неизвестная среда выполнения: ' + app.get('env'));
}

module.exports = app;
