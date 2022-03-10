//module
const World = require('./World.js');

//constant
const GameSettings = require('./GameSetting.js');
const Question = require('./Question.js');

//class Game
module.exports = class Game
{
    //start
    start(io)
    {
        //variable
        const world = new World(io);
        const question = new Question();
        let iTimeLast = Date.now();

        //when connect
        io.on(
            'connection', 
            (socket) => 
            {
                console.log('connection : socket.id = %s', socket.id);

                // when game start
                socket.on('enter-the-game', 
                () => 
                {
                    console.log('enter-the-game : socket.id = %s', socket.id);
                });

                // when get question
                socket.on("get-question", 
                () =>
                {
                    console.log("get-question : socket.id = %s", socket.id);
                    question.setNewQuestion();
                    var json = {
                        "question": question.statement_question, 
                        "statement_ans1": question.answers[0], 
                        "statement_ans2": question.answers[1], 
                        "statement_ans3": question.answers[2], 
                        "statement_ans4": question.answers[3]
                    }
                    socket.emit("set-question", json);
                });

                // when finish question
                socket.on("finish-question", 
                () =>
                {
                    console.log("finish-question : socket.id = %s", socket.id);
                });

                //when disconnect
                socket.on("disconnect", 
                () => 
                {
                    console.log('disconnect : socket.id = %s', socket.id)
                });
            });
    }
}