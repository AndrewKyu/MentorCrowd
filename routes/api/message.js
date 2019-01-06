const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


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

module.exports = router;