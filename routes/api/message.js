const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const path = require('path');
/*
------------------------------------------------|
|    @route         GET api/message/test        |
|    @description   Tests message route         | 
|    @access        Public                      |
------------------------------------------------|
*/
router.get('/test', (req, res) => {
    res.json({msg: "messenger route connected"});
});

/*
------------------------------------------------|
|    @route         GET api/message/            |
|    @description   Serves the messenger HTML   | 
|    @access        Public for testing          |
------------------------------------------------|
*/
router.get('/', (req, res) => {
    var messengerPath = path.resolve(
        __dirname, 
        '..', 
        '..', 
        'message.html');
    res.sendFile(messengerPath);

});

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         console.log('1 user on');
//         io.emit('chat message', msg);
//     });
// });


module.exports = router;