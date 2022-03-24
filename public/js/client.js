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

//press button1
document.getElementById("button1").addEventListener('click', function()
{
    console.log("press : button = %s", this.value);
    if (this.value == "toGame")
    {
        socket.emit("get-question");
        this.value = "toExplanation";
        this.innerText = "次に進む";
    }

    else if (this.value == "toExplanation")
    {
        socket.emit("finish-answer");
        screen.renderExample();
        screen.renderExplanation();
        this.value = "toQuestion";
    }

    else if (this.value == "toQuestion")
    {
        socket.emit("get-question");
        document.getElementById("example").innerText = ""
        document.getElementById("explanation").innerText = ""
        this.value = "toExplanation";
    }
});

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
        document.getElementById("game_scene").style.display = "block";
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