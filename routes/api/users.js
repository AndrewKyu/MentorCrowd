//Importing Express
const express = require('express');
const router = express.Router();

//Encryptions
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Validations
const validateRegisterInput = require('../../validation/register');

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
    console.log(`testing.. ${req}`);
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

module.exports = router;
