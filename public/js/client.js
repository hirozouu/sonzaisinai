'use strict'

//object
const socket = io.connect();

//canvas object
const screen = new Screen(socket);

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
(objData) =>
{
    screen.renderQuestion(objData);
});

// start button
$('#start-button').on(
    'click', 
    () =>
    {
        let playername = $("#player-name").val();
        let roomname = $("#room-name").val();
        const json = {
            "roomName": roomname, 
            "playerName": playername
        };
        socket.emit('enter-the-room', json);
        document.getElementById("start-screen").style.visibility = "hidden";
        document.getElementById("game-screen").style.visibility = "visible";
        document.getElementById("room").innerText = roomname;
        document.getElementById("name").innerText = playername;
    }
);