'use strict'

//object
const socket = io.connect();

//canvas
const canvas = document.querySelector('#canvas-2d');

//canvas object
const screen = new Screen(socket, canvas);

//display canvas
screen.animate(0);

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
