'use strict'

//object
const socket = io.connect();

//canvas object
const screen = new Screen(socket);

let PLAYERNAME = null;
let ROOMNAME = null;
const MEMBER = {};
let MEMBER_COUNT = 1;

//when unload page
$(window).on(
    'beforeunload', 
    (event) =>
    {
        socket.disconnect();
    }
);

socket.on("set-question", 
(json) =>
{
    screen.renderQuestion(json);
});

// start button
$('#button_start').on(
    'click', 
    () =>
    {
        console.log("click : button = button_start")
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
        document.getElementById("room").innerText = ROOMNAME;
    }
);

socket.on("give-permission", 
() =>
{
    var json = {
        "playerName": PLAYERNAME, 
        "key": socket.id
    };
    socket.broadcast.to(ROOMNAME).emit("enter-the-room", json);
    console.log("enter-the-room : %s", PLAYERNAME)
});

socket.on("enter-the-room", 
(json) =>
{
    MEMBER[json.key] = {
        playerName: json.playerName, 
        score: 0
    };
    console.log("enter-the-room : %s", json.playerName);
});