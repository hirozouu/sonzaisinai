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
        screen.renderQuestion();
        this.value = "toExplanation";
    }
});

socket.on("set-question", 
(question) =>
{
    screen.renderQuestion(question);
});

// start button
$('#start-button').on(
    'click', 
    () =>
    {
        const objConfig = { strPlayerName: $("player-name").val() };
        socket.emit('enter-the-game', objConfig);
        $('#start-screen').hide()
    }
);