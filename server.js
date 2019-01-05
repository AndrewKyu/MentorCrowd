const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');

const app = express();

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

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server running on port ${port}`));
