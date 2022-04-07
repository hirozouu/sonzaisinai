//settings
const SharedSettings = require('../public/js/SharedSettings.js');
const GameSettings = require('./GameSetting.js');

// class player
module.exports = class Player
{
    //constructor
    constructor(playerName, roomName, score)
    {
        this.playerName = playerName;
        this.roomName = roomName;
        this.score = score;
    }

    incrementScore()
    {
        this.score++;
    }
}