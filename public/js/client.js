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
let COUNTER = 1;

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
        document.getElementById("start_scene").style.display = "none";
        document.getElementById("game_scene").style.display = "flex";
        document.getElementById("player1name").style.innerText = PLAYERNAME;
        document.getElementById("roomname").style.innerText = ROOMNAME;
    }
);

// enter the room
socket.on("give-permission", 
() =>
    {
        var json = {
            "playerName": PLAYERNAME, 
            "key": socket.id
        };
        socket.broadcast.to(ROOMNAME).emit("enter-the-room", json);
        console.log("enter-the-room : %s", PLAYERNAME)
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
    }
);

// other player leave the room
socket.on("leave-the-room", 
(json) =>
    {
        delete MEMBER[json.key];
        MEMBER_COUNT--;
        console.log("leave-the-room : %s", json.playerName)
    }
);

// click ready button
$("#button_ready").on(
    "click", 
    () =>
    {
        socket.broadcast.to(ROOMNAME).emit("get-ready")
    }
);

socket.on("get-ready", 
    () =>
    {
        COUNTER++;
    })

// set question and selection
socket.on("set-question", 
(json) =>
    {
        screen.renderQuestion(json);
    }
);