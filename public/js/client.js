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

// press next button
document.getElementById('button').addEventListener('click', function()
{
    console.log('press : button = %s', this.id);
    screen.renderQuestion();
    socket.emit("socket-next-button");
});
