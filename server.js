const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const io = require('socket.io')

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const messages = require('./routes/api/message');

const app = express();
const http = require('http').Server(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongDB
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(()=>console.log('MongoDB connected'))
  .catch(err=> console.log(err));

//password middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/message', messages);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server running on port ${port}`));
