//Importing Express
const express = require('express');
const router = express.Router();
const async = require('async');

//Encryptions
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Validations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//MongoDB Schemas
const User = require('../../models/User');


/*
------------------------------------------------|
|    @route         GET api//users/test         |
|    @description   Test user route             | 
|    @access        Public                      |
------------------------------------------------|
*/
// router.get('/test', (req, res)=> res.json({msg: "Users works"}));

router.get('/test', (req, res)=> {
    console.log(req.body);
    res.send({status: 'success'});
});

/*
------------------------------------------------|
|    @route         POST api//users/registration|
|    @description   Registering a user          | 
|    @access        Public                      |
------------------------------------------------|
*/

router.post('/register', (req, res) => {

    //Checks validations from ../../validation/register
    // console.log(`testing.. ${req}`);
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(user => {
        if(user)
        {
            return res.status(400).json({ email: "Email already exists" });
        }else
        {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              });
        } 
    });
});

/*
------------------------------------------------|
|    @route         POST api//users/login       |
|    @description   Login a user /              |
                    Return JWT Token            | 
|    @access        Public                      |
------------------------------------------------|
*/
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Checks if user exists
    User.findOne({email}).then(user => {
        if(!user){
            errors.email = "Email or password field is incorrect";
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {id: user.id, name: user.name, image: user.image}; //creates JWT Payload

                //Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            }else{
                errors.password = 'Email or password field is incorrect';
                return res.status(400).json(errors);
            }
        });
    });
});

router.get('/connection', 
            passport.authenticate('jwt', { session: false }), 
            (req, res) => {
    var sent = [];
    var connections = [];
    var received = [];
    connectionObj = {};

    sent = req.user.sentRequest;
    connections = req.user.connectionList;
    received = req.user.request;
    
    User.findOne({ _id: req.user._id })
        .populate("connectionList.connectionId")
        .then(user => {
            if(!user){
                errors.nouser = "There is no user with this id";
                return res.status(404).json(errors);
            }
            
            connectionObj.sent = sent;
            connectionObj.connections = connections;
            connectionObj.received = received;
            
            res.json(user);
        })
        .catch(err => res.status(404).json(err));

    res.status(400);
});

router.post('/connection/:user_id', 
            passport.authenticate("jwt", { session: false }), 
            (req, res) => {
    
    console.log(req.params);
    
    //Finding requestee by ID
    User.findOne({ _id: req.params.user_id })
        .then(receiver => {
            if(receiver){

                User.findOneAndUpdate(
                    { _id: req.params.user_id },
                    { $push: {request: {user: req.user._id}}},
                    // {new: true}
                ).then(receiver => {
                    User.findOne({ _id: req.user._id }).then(user => {
                        if(user){
                            User.findOneAndUpdate(
                                { _id: req.user._id },
                                { $push: { sentRequest: {user: req.params.user_id} }},
                                // {new: true}
                            ).then(user => {
                                res.json(user);
                            })
                        }
                    })
                });
            }
        })
});

router.post('/connection/accept/:requester_id', 
            passport.authenticate("jwt", { session: false }), 
            (req, res) => {
    
    // var result = {};
    //Finding requestee by ID
    User.findOne({ _id: req.user._id })
        .then(user => {
            if(user){

                User.findOneAndUpdate(
                    { _id: req.params.requester_id },
                    { 
                        $push: { connectionList: {connectionId: req.user._id} },
                        $pull: { sentRequest: {user: req.user._id} }
                    }
                ).then(requester => {
                    console.log(requester);
                    User.findOne({ _id: req.user._id }).then(user => {
                        if(user){

                            User.findOneAndUpdate(
                                { _id: req.user._id },
                                { 
                                    $push: { connectionList: {connectionId: req.params.requester_id} },
                                    $pull: { request: {user: req.params.requester_id}}
                                }
                            ).then(user => {
                                console.log(user)
                                res.json(user);
                            })
                        }
                    })
                });
            }
        })
});
module.exports = router;
