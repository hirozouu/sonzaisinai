//module
const World = require('./World.js');

//constant
const GameSettings = require('./GameSetting.js');
const Question = require('./Question.js');
const { json } = require('express/lib/response');

// global veriable
const ROOM = {};
const PLAYER = {};
const COUNTER = {};

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
                PLAYER[socket.id] = {
                    playerName: null, 
                    roomName: null, 
                    score: 0
                };
                console.log('connection : socket.id = %s', socket.id);

                // enter the room
                socket.on('get-permission',
                (json) => 
                {
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

                    PLAYER[socket.id].playerName = playername;
                    PLAYER[socket.id].roomName = roomname;
                    if (!ROOM[roomname])
                    {
                        ROOM[roomname] = {
                            memberCount: 0, 
                            question: null
                        };
                        COUNTER[roomname] = 0;
                    }

                    socket.join(roomname);
                    socket.strRoomName = roomname;
                    ROOM[roomname].memberCount++;
                    io.to(socket.id).emit("give-permission");
                    console.log('enter-the-room : socket.id = %s', socket.id);
                });

                // leave the room
                socket.on("leave-the-room", 
                () =>
                {
                    console.log("leave-the-room : %s", socket.id);
                    if ("strRoomName" in socket)
                    {
                        socket.leave(socket.strRoomName);
                        socket.strRoomName = ""
                    }
                });

                // echo enter-the-room
                socket.on("enter-the-room", 
                (json) =>
                {
                    io.to(socket.strRoomName).emit("enter-the-room", json);
                    var data = {};
                    for (var key of Object.keys(PLAYER)){
                        if (PLAYER[key].roomName == socket.strRoomName 
                            && key != socket.id){
                            data[key] = PLAYER[key];
                        }
                    }
                    io.to(socket.id).emit("set-player-information", data)
                });

                // when client get ready
                socket.on("get-ready", 
                () =>
                {
                    COUNTER[socket.strRoomName]++;
                    console.log(COUNTER[socket.strRoomName]);
                    if (COUNTER[socket.strRoomName] >= ROOM[socket.strRoomName].memberCount){
                        io.to(socket.strRoomName).emit("everyone-get-ready");
                        COUNTER[socket.strRoomName] = 0;
                    }
                });

                // when client finish answer
                socket.on("finish-answer", 
                () =>
                {
                    COUNTER[socket.strRoomName]++;
                    if (COUNTER[socket.strRoomName] >= ROOM[socket.strRoomName].memberCount){
                        io.to(socket.strRoomName).emit("everyone-finish-answer");
                        COUNTER[socket.strRoomName] = 0;
                    }
                });

                // when client get question
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
                });

                socket.on("get-answer", 
                (json) =>
                {
                    var check = "wrong";
                    if (idx[parseInt(json)] == 0){
                        check = "right";
                        PLAYER[socket.id].score++;
                    }
                    var data = {
                        "check": check, 
                        "text_answer": question.text_answer
                    };
                    io.to(socket.id).emit("set-answer", data);
                    
                    COUNTER[socket.strRoomName]++;
                    if (COUNTER[socket.strRoomName] >= ROOM[socket.strRoomName].memberCount){
                        var data = {};
                        for (var key of Object.keys(PLAYER)){
                            if (PLAYER[key].roomName == socket.strRoomName 
                                && key != socket.id){
                                data[key] = PLAYER[key];
                            }
                        }
                        io.to(strRoomName).emit("update-score", data)
                    }
                });

                //when disconnect
                socket.on("disconnect", 
                () => 
                {
                    delete PLAYER[socket.id];
                    console.log('disconnect : socket.id = %s', socket.id);
                });
            });
    }
}