var express = require('express');
var router = express.Router();
const Player = require('../models/playerModel'); //import the player model
router.get('/', function(req, res, next) {
    res.render('addPlayer'); //render the addplayer view
    });
//addplayer form
router.post('/', async function(req, res, next) {
    const playerData = {
        playerName: req.body.playerName,
        playerTeam: req.body.playerTeam
    }; //get the player name and team from the form
    const player = Player(playerData); //create a new player object
    const existingPlayer = await Player.findOne({ playerName: req.body.playerName });
    if (existingPlayer) {
        existingPlayer.playerTeam = req.body.playerTeam; // update the team if it has changed
        await existingPlayer.save();
        console.log('Player updated successfully!');
        res.redirect('/listplayers');
        return;
    }
    player.save() //save the player to the database
        .then(() => {
            console.log('Player saved successfully!'); //log success message
            res.redirect('/listplayers'); //redirect to the listplayers page
        })
        .catch((err) => {
            console.error('Error saving player:', err); //log error message
        });

    console.log(req.body.playerName); //get the player name from the form
    console.log(req.body.playerTeam); //get the player team from the form

}); //handle the post request from the addplayer form

module.exports = router; //export the router object

