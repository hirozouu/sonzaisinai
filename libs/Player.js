//settings
const SharedSettings = require('../public/js/SharedSettings.js');
const GameSettings = require('./GameSetting.js');

// class player
module.exports = class Player
{
    //constructor
    constructor(name, playerName, score)
    {
        this.name = name;
        this.playerName = playerName;
        this.score = score;
    }

    incrementScore()
    {
        this.score++;
    }
}