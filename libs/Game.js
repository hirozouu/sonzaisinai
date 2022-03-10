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
                    var strArr = [question.statement_question, question.getAnswers[0], 
                        question.getAnswers[1], question.getAnswers[2], question.getAnswers[3]];
                    socket.emit("set-question", strArr);
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