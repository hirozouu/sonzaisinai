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

// key down, key up
let objMovement = {}; // movement
$(document).on(
    'keydown keyup', 
    (event) =>
    {
        const KeyToCommand = {
            'ArrowUp': 'forward', 
            'ArrowDown': 'back', 
            'ArrowLeft': 'left', 
            'ArrowRight': 'right', 
        };
        const command = KeyToCommand[event.key];
        if (command)
        {
            if (event.type == 'keydown')
            {
                objMovement[command] = true;
            }
            else // if (event.type == 'keyup')
            {
                objMovement[command] = false;
            }
            socket.emit('change-my-movement', objMovement);
        }
    }
);

//press start button
document.getElementById("toGame").addEventListener('click', function()
{
    console.log("press-button : %s", this.id);
    screen.renderQuestion();
    document.getElementById("toGame").id = "toExplanation"
    document.getElementById("toExplanation").innerText = "次に進む"
    socket.emit("start")
})

// press next button
document.getElementById("toExplanation").addEventListener('click', function()
{
    console.log("press-button : %s", this.id);
    document.getElementById("toExplanation").id = "toQuestion";
    socket.emit("next");
});

//press next button
ducument.getElementById("toQuestion").addEventListener('click', function()
{
    console.log("press-button : %s", this.id);
    screen.renderQuestion();
    document.getElementById("toQuestion").id = "toExplanation"
    socket.emit("next")
});
