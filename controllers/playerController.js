var playerModel = require('../models/playerModel');
class PlayerService{


    static list(){
        return playerModel.find({}).then((players) => {
            return players;
        })
    };

    static find(playerName){
        return playerModel.findOne({playerName: playerName}).then((player) => {
            return player;
        })}
    static create(playerData){
        const player = new playerModel(playerData); //create a new player object
        return player.save() //save the player to the database
            .then(() => {
                console.log('Player saved successfully!'); //log success message
                return player; //return the player object
            })
            .catch((err) => {
                console.error('Error saving player:', err); //log error message
                throw err; //throw the error to be handled by the caller
            });
    }
    static update(playerName,playerData){
        return playerModel.findOne({playerName: playerName}).then((player) => {
            player.set({
                playerName: playerData.playerName,
                playerTeam: playerData.playerTeam
            });
            
            player.save();
            return player;
    });
    }
    static delete(playerName){
        return playerModel.deleteOne({playerName: playerName}).then((player) => {
            return player;
        })
    }
}
module.exports.PlayerService = PlayerService;