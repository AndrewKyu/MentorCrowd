const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Connection = require('../../models/Connections');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/*
------------------------------------------|
|    @route         GET api/connections/  |
|    @description   Get connection        | 
|    @access        Public                |
------------------------------------------|
*/

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Connection.find()
        .populate("user")
        .then(connection => {
            res.json(connection);
        })
        .catch(err => res.status(404).json({noconnections: "You don't have any connections"}));
});

/*
---------------------------------------------|
|    @route         GET api/connections/:id  |
|    @description   Get connection by ID     |
|    @access        Public                   |
---------------------------------------------|
*/
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Connection.findById(req.params.id)
        .populate("user")
        .then(connection => res.json(connection))
        .catch(err => res.status(404).json({ noconnection: "No connection found with that ID"}))
});

/*
---------------------------------------------|
|    @route         POST api/connections/:id |
|    @description   Request connection by ID | 
|    @access        Private                  |
---------------------------------------------|
*/
router.post('/connection/:user_id', passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log(req.params);


});
module.exports = router;