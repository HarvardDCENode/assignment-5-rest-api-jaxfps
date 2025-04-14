var express = require('express');
var router = express.Router();
const Player = require('../models/playerModel'); //import the player model
router.get('/', function(req, res, next) {
    res.end('no player specified');
    console.log('no player specified');
    });
//find 
router.get('/:playerName', function(req, res, next) {
    player=Player.findOne({playerName: req.params.playerName}).then((player) => {
        console.log(player);
        res.render('player', { player }); // Pass the player to the view
    })
     }
);
//delete
router.get('/:playerName/delete', function(req, res, next) {
    Player.deleteOne({playerName: req.params.playerName}).then(() => {
        console.log('Player deleted successfully!');
        res.redirect('/listplayers'); //redirect to the listplayers page
    })
    .catch((err) => {
        console.error('Error deleting player:', err); //log error message
    })}); //delete the player from the database
    module.exports = router; //export the router object