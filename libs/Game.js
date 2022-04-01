//module
const World = require('./World.js');
const Question = require('./Question.js');
const GameSettings = require('./GameSetting.js');
const { json } = require('express/lib/response');

// global veriable
const ROOM = {};
const PLAYER = {};
const COUNTER = {};

//class Game
module.exports = class Game
{
    //start
    start(io, client)
    {
        // when connect
        io.on(
            'connection', 
            (socket) => 
            {
                let playername = null;
                let roomname = null;
                socket.strRoomName = null;
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
                            question: new Question(client)
                        };
                        COUNTER[roomname] = 0;
                    }

                    socket.join(roomname);
                    socket.strRoomName = roomname;
                    ROOM[socket.strRoomName].memberCount++;
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
                    ROOM[socket.strRoomName].question.setNewQuestion();
                    var json = {
                        "text_question": ROOM[socket.strRoomName].question.text_question, 
                        "selection1": ROOM[socket.strRoomName].question.selection[0], 
                        "selection2": ROOM[socket.strRoomName].question.selection[1], 
                        "selection3": ROOM[socket.strRoomName].question.selection[2], 
                        "selection4": ROOM[socket.strRoomName].question.selection[3]
                    };
                    io.to(socket.id).emit("set-question", json);
                });

                socket.on("get-answer", 
                (num) =>
                {
                    var check = ROOM[socket.strRoomName].question.answer[num];
                    if (check)
                    {
                        PLAYER[socket.id].score++;
                    }
                    var data = {
                        "check": check,  
                        "text_answer": ROOM[socket.strRoomName].question.text_answer
                    };
                    io.to(socket.id).emit("set-answer", data);
                    COUNTER[socket.strRoomName]++;
                    
                    if (COUNTER[socket.strRoomName] >= ROOM[socket.strRoomName].memberCount){
                        var data = {};
                        for (var key of Object.keys(PLAYER))
                        {
                            if (PLAYER[key].roomName == socket.strRoomName)
                            {
                                data[key] = PLAYER[key];
                            }
                        }
                        io.to(socket.strRoomName).emit("update-score", data)
                        COUNTER[socket.strRoomName] = 0;
                    }
                });

                //when disconnect
                socket.on("disconnect", 
                () => 
                {
                    delete PLAYER[socket.id];
                    if (ROOM[strRoomName])
                    {
                        ROOM[socket.strRoomName].memberCount--;
                        if (ROOM[socket.strRoomName].memberCount == 0)
                        {
                            delete ROOM[socket.strRoomName];
                            delete COUNTER[socket.strRoomName];
                        }
                    }
                    console.log('disconnect : socket.id = %s', socket.id);
                });
            });
    }
}