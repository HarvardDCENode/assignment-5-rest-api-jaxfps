var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.end('no team specified');
    console.log('no team specified');
    }
);  
router.get('/:teamName', function(req, res, next) { 
    res.render('team',{teamName: req.params.teamName});
    console.log('team: ' + req.params.teamName);
    }
);
module.exports = router; //export the router object