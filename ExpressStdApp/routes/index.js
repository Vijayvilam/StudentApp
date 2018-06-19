'use strict';
var express = require('express');
var router = express.Router();


router.get('/StudentApp', function (request, response) {
    response.sendfile("views/studentsList.html");
});
//db.on('error', console.error.bind(console, "connection error"));
//console.log("moviesDb is open...");
module.exports = router;
