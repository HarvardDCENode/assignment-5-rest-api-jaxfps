var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('homePage'); //render the homePage view
    });



module.exports = router; //export the router object
