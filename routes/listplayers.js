var express = require('express');
var router = express.Router();
const Players = require('../models/playerModel'); //import the player model
router.get('/',  function(req, res, next) {
     players = Players.find({}) //find all players in the database
    .then((players) => {
        console.log(players); //log the players to the console
        res.render('listPlayers', { players }); // Pass the players to the view
    })
    .catch((err) => {
        console.error('Error retrieving players:', err); //log error message
    });

    
    
    });



module.exports = router; //export the router object

