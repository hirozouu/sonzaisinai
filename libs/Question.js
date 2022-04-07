// settings
const SharedSettings = require("../public/js/SharedSettings.js");
const GameSettings = require("./GameSetting.js");
const postgres = require("./postgres.js");

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
        this.answer = [false, false, false, false];
        this.text_explanation = "Explamation"; // explanation
    }

    // get new question from database
    async setNewQuestion()
    {
        const result = await postgres.selectRandom();

        this.id = result.id;
        this.text_question = result.text_question;
        this.selection = [result.selection0, result.selection1, 
            result.selection2, result.selection3];
        this.text_answer = result.text_answer;
        this.answer = [false, false, false, false];
        this.answer[result.answer] = true;
        this.text_explanation = result.text_explanation;
    }
}