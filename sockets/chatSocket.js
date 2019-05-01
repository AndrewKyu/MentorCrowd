const mongoose = require('mongoose');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

exports = module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('a user is connected');
        socket.on('chat message', (msg) => {
            console.log(`Message: ${msg}`);
            io.emit('chat message', msg);
        });
    });
};