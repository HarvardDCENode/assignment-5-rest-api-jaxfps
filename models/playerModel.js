var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var playerSchema = new Schema({
    playerName: { type: String, required: true },
    playerTeam: { type: String, required: true }
});

module.exports = mongoose.model('Player', playerSchema);