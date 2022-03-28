//module
const World = require('./World.js');

//constant
const GameSettings = require('./GameSetting.js');
const Question = require('./Question.js')

// global veriable
const MEMBER = {};
let MEMBER_COUNT = 1;

//class Game
module.exports = class Game
{
    //start
    start(io)
    {
        //variable
        const world = new World(io);
        const question = new Question();

        //when connect
        io.on(
            'connection', 
            (socket) => 
            {
                console.log('connection : socket.id = %s', socket.id);

                // when enter the room
                socket.on('get-permission',
                (json) => 
                {
                    console.log('enter-the-room : socket.id = %s', socket.id);
                    let roomname = json.roomName;
                    let playername = json.playerName;

                    if (!roomname)
                    {
                        roomname = "*********NoName**********";
                    }

                    socket.join(roomname);
                    socket.strRoomName = roomname;
                    io.to(socket.id).emit("give-permission");
                });

                // when leave the room
                socket.on("leave-the-room", 
                () =>
                {
                    console.log("leave-the-room : ", socket.id);
                    if ("strRoomName" in socket)
                    {
                        console.log("Room name : ", socket.strRoomName);
                        socket.leave(socket.strRoomName);
                        socket.strRoomName = ""
                    }
                })

                // echo enter-the-room
                socket.on("enter-the-room", 
                (json) =>
                    {
                    }
                );

                // echo set-player-information
                socket.on("set-player-information", 
                (json) =>
                    {
                    }
                );

                // echo get-ready
                socket.on("get-ready", 
                (json) =>
                    {
                        socket.emit("get-ready", json);
                    }
                );

                // echo finish-answer
                socket.on("finish-answer", 
                (json) =>
                    {
                        socket.emit("finish-answer",  json)
                    }
                );

                // when get question
                socket.on("get-question", 
                () =>
                {
                    console.log("get-question : socket.id = %s", socket.id);
                    question.setNewQuestion();
                    var idx = question.getSelection();
                    var json = {
                        "text_question": question.text_question, 
                        "selection1": question.selection[idx[0]], 
                        "selection2": question.selection[idx[1]], 
                        "selection3": question.selection[idx[2]], 
                        "selection4": question.selection[idx[3]]
                    };
                    io.to(socket.id).emit("set-question", json);
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