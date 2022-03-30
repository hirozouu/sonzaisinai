// settings
const SharedSettings = require('../public/js/SharedSettings.js');
const GameSettings = require('./GameSetting.js');

// class question
module.exports = class Question
{
    //constructor
    constructor()
    {
        this.id = "0000" // id
        this.text_question = "Question?"; // question text
        // selection (selection[0] = correct answer)
        this.selection = ["Correct Answer", "Incorrect Answer1", 
            "Incorrect Answer2", "Incorrect Answer3"];
        this.text_answer = "Answer"; // answer text
    }

    // get new question from database
    setNewQuestion()
    {
        this.id = "0000"
        this.text_question = "存在しないカードは？";
        this.selection = ["サイバー・チャージャー", "アクア・チャージャー", 
            "エナジー・チャージャー", "スパイラル・チャージャー"];
        this.answer = [true, false, false, false];
        this.text_answer = "サイバー・チャージャー";
    }
}