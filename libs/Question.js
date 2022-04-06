// settings
const SharedSettings = require("../public/js/SharedSettings.js");
const GameSettings = require("./GameSetting.js");

// class question
module.exports = class Question
{
    //constructor
    constructor(client)
    {
        this.client = client;
        this.id = 0; // id
        this.text_question = "Question?"; // question text
        this.selection = ["Select0", "Select1", 
            "Select2", "Select3"]; // selection
        this.text_answer = "Answer"; // answer text
        this.answer = [true, false, false, false];
        this.text_explanation = "Explamation"; // explanation
    }

    // get new question from database
    setNewQuestion()
    {
        this.id = 0;
        this.text_question = "存在しないものは？";
        this.selection = ["存在しないもの", "存在するもの", 
            "存在するもの", "存在しないもの"];
        this.text_answer = "存在しないもの";
        this.answer = [true, false, false, false];
        this.text_explanation = "解説"
    }
}