'use strict'

//object
const socket = io.connect();

//canvas object
const screen = new Screen(socket);

let PLAYERNAME = null;
let ROOMNAME = null;
let SCORE = 0;
let COUNTER = 0;
let SELECT = -1;

//when unload page
$(window).on(
    'beforeunload', 
    (event) =>
    {
        var json = {
            "key": socket.id
        }
        socket.broadcast(ROOMNAME).emit("leave-the-room", json)
        socket.disconnect();
    }
);

// click room join button
$("#button_enter").on(
    "click", 
    () =>
    {
        PLAYERNAME = $("#input_playername").val();
        ROOMNAME = $("#input_roomname").val();
        var json = {
            "playerName": PLAYERNAME, 
            "roomName": ROOMNAME, 
        };
        socket.emit("get-permission", json);
    }
);

// enter the room
socket.on("give-permission", 
() =>
    {
        document.getElementById("start_scene").style.display = "none";
        document.getElementById("game_scene").style.display = "flex";
        document.getElementById("roomname").innerText = ROOMNAME;
        var json = {
            "playerName": PLAYERNAME, 
            "roomName": ROOMNAME, 
        };
        socket.emit("enter-the-room", json);
    }
);

// when players enter the room
socket.on("enter-the-room", 
(json) =>
    {
        screen.renderProfile(json.playerName, 0);
        console.log("enter-the-room : %s", json.playerName);
    }
);

// when server set other player information
socket.on("set-player-information", 
(json) =>
    {
        for (var key of Object.keys(json)){
            screen.renderProfile(json[key].playerName, json[key].score);
            console.log("%s : get-player-information %s", PLAYERNAME, json[key].playerName)
        }
    }
);

// other player leave the room
socket.on("leave-the-room", 
(json) =>
    {
        delete MEMBER[json.key];
        MEMBER_COUNT--;
        console.log("leave-the-room : %s", json.playerName);
    }
);

// click ready button
$("#button_ready").on(
    "click", 
    () =>
    {
        var json = {
            "playerName": PLAYERNAME, 
            "roomName": ROOMNAME
        };
        socket.emit("get-ready", json);
    }
);

// other player get ready
socket.on("get-ready", 
    (json) =>
    {
        console.log("get-ready : %s", json.playerName);
        COUNTER++;
        if (COUNTER >= MEMBER_COUNT)
        {
            console.log("start-the-game");
            document.getElementById("box_ready").style.display = "none";
            document.getElementById("question1").style.display = "flex";
            document.getElementById("question2").style.display = "flex";
            COUNTER = 0;
            socket.emit("get-question");
        };
    }
);

// set question and selection
socket.on("set-question", 
(json) =>
    {
        screen.renderQuestion(json);
    }
);

// click answer button
$("#button_answer").on(
    "click", 
    () =>
    {
        var json = {
            "playerName": PLAYERNAME, 
            "roomName": ROOMNAME
        };
        socket.emit("finish-answer", json);
    }
);

// other player finish answer
socket.on("finish-answer", 
(json) =>
    {
        console.log("finish-answer : %s", json.playerName);
        COUNTER++;
        if (COUNTER >= MEMBER_COUNT)
        {
            document.getElementById("question2").style.display = "none";
            document.getElementById("answer").style.display = "flex";
            COUNTER = 0;
            var json = {
                "playerName": PLAYERNAME, 
                "roomName": ROOMNAME, 
                "select": SELECT
            }
            socket.emit("get-answer", json);
        };
    }
);

// check answer
socket.on("set-answer", 
(json) =>
    {
        screen.renderAnswer(json);
    }
);