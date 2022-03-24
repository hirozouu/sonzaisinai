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
        this.text_answer = "サイバー・チャージャー";
    }

    getSelection()
    {
        // random shuffle
        function fisherYatesShuffle(arr){
            for(var i = arr.length-1; i>0; i--){
                var j = Math.floor(Math.random() * (i + 1)); //random index
                [arr[i],arr[j]]=[arr[j], arr[i]]; // swap
            }

            return arr;
        }

        var shuffle_answers = fisherYatesShuffle(this.selection);
        return shuffle_answers;
    }
}