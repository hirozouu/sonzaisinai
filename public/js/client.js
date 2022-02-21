'use strict'

//object
const socket = io.connect();

//canvas
const canvas = document.querySelector('#canvas-2d');

//canvas object
const screen = new Screen(socket, canvas);

//start canvas
screen.animate(0)

//when upload page
$(window).on(
    'beforeupload', 
    (event) =>
    {
        socket.disconnect();
    }
);