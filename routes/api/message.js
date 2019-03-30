const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const path = require('path');

//Importing Conversation, Messenger, and User models
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message');
const User = require('../../models/User');

//Validation Inputs
const validateMessageInput = require('../../validation/message');
const validateConversationInput = require('../../validation/conversation');

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

/*
---------------------------------------------------|
|    @route         GET api/message/conversations  |
|    @description   Retrieves all conversations    | 
|    @access        Private                        |
---------------------------------------------------|
*/
router.get(
    '/conversations', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
    const errors = {};

    Conversation.find()
            .populate("user")
            .then(conversations => {
                if(!conversations){
                    errors.noconversations = "There are no conversations";
                    res.status(404).json(errors);
                }
                res.json(conversations);
            })
            .catch(err => res.status(404).json({ conversation: "There are no conversations" }));
});

/*
------------------------------------------------------|
|    @route         GET api/message/:conversation_id  |
|    @description   Retrieves single conversation     | 
|    @access        Private                           |
------------------------------------------------------|
*/
router.get(
    '/:conversation_id', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        const errors = {};

        Message.find({ conversationId: req.params.conversation_id })
            .populate("user")
            .then(conversation => {
                if(!conversation){
                    errors.noconversation = "That conversation does not exist";
                    res.status(404);
                }
                res.json(conversation);
            })
            .catch(err => res.status(404).json(err));
});

/*
-------------------------------------------------------|
|    @route         POST api/message/:conversation_id  |
|    @description   Send reply in conversation         | 
|    @access        Private                            |
-------------------------------------------------------|
*/
router.post(
    '/:conversation_id', 
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
        const msgResponse = new Message({
            conversationId: req.params.conversation_id,
            message: req.body.message,
            user: req.user.id,
            date: req.body.date
        });

        msgResponse
            .save()
            .then(reply => res.json(reply))
            .catch(err => console.log(err));

});

/*
-------------------------------------------------------|
|    @route         POST api/message/new/:recipient    |
|    @description   Start new conversation             | 
|    @access        Private                            |
-------------------------------------------------------|
*/
router.post(
    '/new/:recipient', 
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        const { conversationErrors, isConversationValid } = validateConversationInput(req.params.recipient);
        const { messageErrors, isMessageValid } = validateMessageInput(req.body);

        if(!isConversationValid){
            return res.status(400).json(conversationErrors);
        }

        if(!isMessageValid){
            return res.status(400).json(messageErrors);
        }
        
        const newConversation = new Conversation({
            user: [req.user.id, req.params.recipient]
        });

        newConversation
            .save()
            .then((conversation) => {
                const newMessage = new Message({
                    conversationId: conversation._id,
                    message: req.body.message,
                    user: req.user.id,
                    date: req.body.date
                });
                
                newMessage
                    .save()
                    .then(message => res.json(message))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
});

module.exports = router;