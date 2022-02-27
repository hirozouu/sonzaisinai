'use strict'

//object
const socket = io.connect();

//canvas object
const screen = new Screen(socket);
screen.renderQuestion();

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

// press send button
$('form').submit(() =>{
    const $inp = $('#input_message');
    const text = $inp.val();

    console.log('#input_message : ', text);

    if (text) {
        socket.emit('new-message', text);
        // empty text box
        $inp.val('');
    }

    return false;
});

socket.on(
    'spread-message', 
    (strMessage) => 
    {
        console.log('spread-message : ', strMessage);

        // add list
        const li_element = $('<li>').text(strMessage);
        $('#message_list').prepend(li_element);
    }
);
