'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var template = require('./template.js');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/student');
var db = mongoose.connection;
var mongoOps = require('./routes/MongoOperations.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/StudentApp', express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));
    
app.use('/', routes);
app.use('/users', users);
/*
app.get('/StudentApp', function (request, response) {
    response.sendfile("views/studentsList.html");
});*/
app.get('/StudentApp/template', template.get);
app.post('/StudentApp/upload', mongoOps.post);
app.get('/StudentApp/api/students', mongoOps.fetch);
app.post('/StudentApp/api/students', mongoOps.add);
app.put('/StudentApp/api/students/update/:_id', mongoOps.update);
app.delete('/StudentApp/api/students/delete/:_id', mongoOps.delete);
app.get('/StudentApp/api/students/search/:std_id', mongoOps.searchId);
app.get('/StudentApp/api/students/search/name/:std_id/:std_name', mongoOps.searchName);
app.get('/StudentApp/api/students/search/course/:std_college/:std_course/:std_year', mongoOps.searchCourse);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
