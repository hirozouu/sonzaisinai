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