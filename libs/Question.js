// settings
const SharedSettings = require('../public/js/SharedSettings.js');
const GameSettings = require('./GameSetting.js');

// class question
module.exports = class Question
{
    //constructor
    constructor(){
        this.ex = null;
        this.correct_ans = null;
        this.incorrect_ans1 = null;
        this.incorrect_ans2 = null;
        this.incorrect_ans3 = null;
    }
}