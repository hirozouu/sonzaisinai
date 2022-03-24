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
                        console.log("hogehoge")
                        io.to(json.roomName).emit("get-ready-from-server", json);
                    }
                );

                // when get question
                socket.on("get-question", 
                () =>
                {
                    console.log("get-question : socket.id = %s", socket.id);
                    question.setNewQuestion();
                    var selection = question.getSelection();
                    var json = {
                        "text_question": question.text_question, 
                        "selection1": selection[0], 
                        "selection2": selection[1], 
                        "selection3": selection[2], 
                        "selection4": selection[3]
                    };
                    socket.emit("set-question", json);
                });

                // when finish question
                socket.on("finish-answer", 
                () =>
                {
                    console.log("finish-answer : socket.id = %s", socket.id);
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