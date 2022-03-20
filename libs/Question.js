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
        this.statement_question = "Question?"; // question satement
        // answers (answers[0] = correct ans)
        this.answers = ["Correct Answer", "Incorrect Answer1", 
            "Incorrect Answer2", "Incorrect Answer3"];
        this.explanation = "Explanation"; // explanation
    }

    // get new question from database
    setNewQuestion()
    {
        this.id = "0000"
        this.statement_question = "存在しないカードは？";
        this.answers = ["サイバー・チャージャー", "アクア・チャージャー", 
            "エナジー・チャージャー", "スパイラル・チャージャー"];
        this.explanation = "存在しないのはサイバー・チャージャー";
    }

    getAnswers()
    {
        // random shuffle
        function fisherYatesShuffle(arr){
            for(var i = arr.length-1; i>0; i--){
                var j = Math.floor(Math.random() * (i + 1)); //random index
                [arr[i],arr[j]]=[arr[j], arr[i]]; // swap
            }

            return arr;
        }

        shuffle_answers = fisherYatesShuffle(this.answers);
        console.log(shuffle_answers[0])
        console.log("******")
        return shuffle_answers;
    }
}