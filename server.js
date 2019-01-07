const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const messages = require('./routes/api/message');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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

exports.socket = io.on('connection', (socket) => {
  //console.log('a user is connected');
  socket.on('chat message', (msg) => {
      console.log(`Message: ${msg}`);
      io.emit('chat message', msg);
  });
});

const port = process.env.PORT || 5000;

http.listen(port, ()=> console.log(`server running on port ${port}`));

