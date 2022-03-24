'use strict'

//object
const socket = io.connect();

//canvas object
const screen = new Screen(socket);

let PLAYERNAME = null;
let ROOMNAME = null;
let SCORE = 0;
const MEMBER = {};
let MEMBER_COUNT = 1;
let COUNTER = 0;

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
        MEMBER[socket.id] = {
            playerName: PLAYERNAME, 
            score: 0
        };
        var json = {
            "playerName": PLAYERNAME, 
            "key": socket.id
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
        document.getElementById("player1name").style.innerText = PLAYERNAME;
        document.getElementById("roomname").style.innerText = ROOMNAME;
        var json = {
            "playerName": PLAYERNAME, 
            "roomName": ROOMNAME, 
            "key": socket.id
        };
        socket.emit("enter-the-room", json);
        console.log("enter-the-room : %s", PLAYERNAME);
    }
);

// other player enter the room
socket.on("enter-the-room", 
(json) =>
    {
        MEMBER[json.key] = {
            playerName: json.playerName, 
            score: 0
        };
        MEMBER_COUNT++;
        console.log("enter-the-room : %s", json.playerName);

        var data = {
            "playerName": PLAYERNAME, 
            "score": SCORE, 
            "roomName": ROOMNAME, 
            "key": socket.id
        };
        socket.emit("set-player-information", data);
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
            document.getElementById("box_ready").style.display = "none";
            document.getElementsByClassName("question").style.display = "flex";
            COUNTER = 1;
        };
    });

// set question and selection
socket.on("set-question", 
(json) =>
    {
        screen.renderQuestion(json);
    }
);