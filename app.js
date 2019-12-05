var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routes = require('./routes');
var models = require('./models');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    };
    next();
});

app.use('/session', routes.session);
app.use('/user', routes.user);
app.use('/message', routes.message);

app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;
