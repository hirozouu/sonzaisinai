'use strict'
require('dotenv').config();

// module
const express = require('express');
const http = require('http');
const { Client } = require('pg');
const socketIO = require('socket.io');
const Game = require('./libs/Game.js');

// object
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// constant
const PORT_NO = process.env.PORT || 1337;

const client = new Client({
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS
});

// connect databse
client.connect(
    err =>
    {
        if (err)
        {
            console.error("Connection Error : Database", err.stack)
        }
        else
        {
            console.log("Connection : Database")
        }
    }
);

// new game
const game = new Game();
game.start(io, client);

// public folder
app.use(express.static(__dirname+'/public'))

// start server
server.listen(
    PORT_NO, 
    () =>
    {
        console.log('Starting server on port %d', PORT_NO);
    }
)