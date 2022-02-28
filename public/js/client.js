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

//press button1
document.getElementById("button1").addEventListener('click', function()
{
    console.log("press : button = %s", this.value);
    if (this.value == "toGame")
    {
        screen.renderQuestion();
        this.value = "toExplanation";
        this.innerText = "次に進む";
        socket.emit("start");
    }

    else if (this.value == "toExplanation")
    {
        this.value = "toQuestion";
        socket.emit("next");
    }

    else if (this.value == "toQuestion")
    {
        document.getElementById("explanation").innerText = ""
        screen.renderQuestion();
        this.value = "toExplanation";
        socket.emit("next");
    }
});
