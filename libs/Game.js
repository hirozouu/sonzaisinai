//module
const World = require('./World.js');

//constant
const GameSettings = require('./GameSetting.js');
const Question = require('./Question.js');
const { json } = require('express/lib/response');

// global veriable
const ROOM = {};

//class Game
module.exports = class Game
{
    //start
    start(io)
    {
        //variable
        const world = new World(io);
        const question = new Question();
        let idx = null;

        //when connect
        io.on(
            'connection', 
            (socket) => 
            {
                let playername = null;
                let roomname = null;

                console.log('connection : socket.id = %s', socket.id);

                // enter the room
                socket.on('get-permission',
                (json) => 
                {
                    console.log('enter-the-room : socket.id = %s', socket.id);
                    playername = json.playerName;
                    roomname = json.roomName;
                    

                    if (!playername)
                    {
                        playername = "**********NoName**********";
                    }

                    if (!roomname)
                    {
                        roomname = "*********NoName**********";
                    }

                    socket.join(roomname);
                    console.log(io.of("/name").adapter.rooms[roomname]);
                    socket.strRoomName = roomname;
                    io.to(socket.id).emit("give-permission");
                });

                // leave the room
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
                        socket.broadcast.emit("enter-the-room", json);
                    }
                );

                // echo set-player-information
                socket.on("set-player-information", 
                (json) =>
                    {
                        socket.broadcast.emit("set-player-information", json);
                    }
                );

                // echo get-ready
                socket.on("get-ready", 
                (json) =>
                    {
                        io.to(roomname).emit("get-ready", json);
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
                        question.setNewQuestion();
                        idx = question.getSelection();
                        var json = {
                            "text_question": question.text_question, 
                            "selection1": question.selection[idx[0]], 
                            "selection2": question.selection[idx[1]], 
                            "selection3": question.selection[idx[2]], 
                            "selection4": question.selection[idx[3]]
                        };
                        io.to(socket.id).emit("set-question", json);
                    }
                );

                socket.on("get-answer", 
                (json) =>
                    {
                        var check = "wrong";
                        if (idx[parseInt(json.select)] == 0){
                            check = "right";
                        }
                        var data = {
                            "playerName": json.playerName, 
                            "check": check, 
                            "text_answer": question.text_answer
                        };
                        io.to(socket.id).emit("set-answer", data);
                    }
                );

                //when disconnect
                socket.on("disconnect", 
                () => 
                    {
                        delete MEMBER[socket.id];
                        console.log('disconnect : socket.id = %s', socket.id);
                    }
                );
            });
    }
}