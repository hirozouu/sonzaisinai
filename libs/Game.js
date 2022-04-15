//module
const Question = require('./Question.js');
const Player = require('./Player.js');
const Room = require('./Room.js');
const SharedSettings = require('../public/js/SharedSettings.js');
const GameSettings = require('./GameSetting.js');

const postgres = require("./postgres.js");
const { json } = require('express/lib/response');

// global veriable
const ROOM = {};
const PLAYER = {};

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
                console.log('CONNECT : socket.id = %s', socket.id);

                // enter the room
                socket.on('get-permission',
                (json) => 
                {
                    var playername = json.playerName;
                    var roomname = json.roomName;

                    if (!playername)
                    {
                        playername = "**********NoName**********";
                    }

                    if (!roomname)
                    {
                        roomname = "*********NoName**********";
                    }

                    // new player object
                    PLAYER[socket.id] = new Player(playername, roomname, 0);

                    if (!ROOM[roomname])
                    {
                        ROOM[roomname] = new Room();
                    }

                    socket.join(roomname);
                    socket.strRoomName = roomname;
                    ROOM[socket.strRoomName].joinMember();
                    io.to(socket.id).emit("give-permission");
                    console.log('ENTER-THE-ROOM : socket.id = %s', socket.id);
                });

                // leave the room
                socket.on("leave-the-room", 
                () =>
                {
                    console.log("LEAVE-THE-ROOM : %s", socket.id);
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
                    // echo enter-the-room
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
                    ROOM[socket.strRoomName].incrementCount();
                    if (ROOM[socket.strRoomName].counter >= ROOM[socket.strRoomName].memberCount){
                        io.to(socket.strRoomName).emit("everyone-get-ready");
                        ROOM[socket.strRoomName].resetCount();
                    }
                });

                // when client finish answer
                socket.on("finish-answer", 
                () =>
                {
                    ROOM[socket.strRoomName].incrementCount();
                    if (ROOM[socket.strRoomName].counter >= ROOM[socket.strRoomName].memberCount){
                        io.to(socket.strRoomName).emit("everyone-finish-answer");
                        ROOM[socket.strRoomName].resetCount();
                    }
                });

                // when client get question
                socket.on("get-question", 
                () =>
                {
                    ROOM[socket.strRoomName].incrementCount();
                    if (ROOM[socket.strRoomName].counter >= ROOM[socket.strRoomName].memberCount){
                        ROOM[socket.strRoomName].resetCount();
                        const getQuestion = async () =>
                        {
                            await ROOM[socket.strRoomName].question.setNewQuestion();
                            var json = {
                                "text_question": ROOM[socket.strRoomName].question.text_question, 
                                "selection1": ROOM[socket.strRoomName].question.selection[0], 
                                "selection2": ROOM[socket.strRoomName].question.selection[1], 
                                "selection3": ROOM[socket.strRoomName].question.selection[2], 
                                "selection4": ROOM[socket.strRoomName].question.selection[3]
                            };
                            io.to(socket.strRoomName).emit("set-question", json);
                        }
                        getQuestion();
                    }
                });

                // check answer and update score
                socket.on("get-answer", 
                (num) =>
                {
                    // check answer
                    function checkAnswer()
                    {
                        var check = null;
                        if (num == -1)
                        {
                            check = false;
                        }
                        else
                        {
                            check = ROOM[socket.strRoomName].question.answer[num];
                        }

                        if (check)
                        {
                            PLAYER[socket.id].incrementScore();
                        }
                        var data = {
                            "check": check,  
                            "text_answer": ROOM[socket.strRoomName].question.text_answer, 
                            "text_explanation": ROOM[socket.strRoomName].question.text_explanation
                        };
                        io.to(socket.id).emit("set-answer", data);
                        ROOM[socket.strRoomName].incrementCount();
                    }

                    // update score
                    function updateScore()
                    {
                        if (ROOM[socket.strRoomName].counter >= ROOM[socket.strRoomName].memberCount)
                        {
                            var data = {};
                            for (var key of Object.keys(PLAYER))
                            {
                                if (PLAYER[key].roomName == socket.strRoomName)
                                {
                                    data[key] = PLAYER[key];
                                }
                            }
                            io.to(socket.strRoomName).emit("update-score", data)
                            ROOM[socket.strRoomName].resetCount();
                        }
                    }

                    const setAnswer = async () =>
                    {
                        await checkAnswer();
                        updateScore();
                    }

                    setAnswer();
                });

                // when client post quiz
                socket.on("post-quiz", 
                (json) =>
                {
                    postgres.insertQuiz(json);
                });

                //when disconnect
                socket.on("disconnect", 
                () => 
                {
                    if (PLAYER[socket.id])
                    {
                        delete PLAYER[socket.id];
                        console.log('DISCONNECT : socket.id = %s', socket.id);
                    }

                    if (ROOM[socket.strRoomName])
                    {
                        ROOM[socket.strRoomName].leaveMember();
                        if (ROOM[socket.strRoomName].memberCount == 0)
                        {
                            delete ROOM[socket.strRoomName];
                            console.log('DELETE : roomname = %s', socket.strRoomName)
                        }
                    }
                });
            });
    }
}