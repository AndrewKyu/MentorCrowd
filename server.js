const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');

const app = express();

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongDB
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(()=>console.log('MongoDB connected'))
  .catch(err=> console.log(err));

  //use routes
  app.use('/api/users', users);
  app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.get('/', (req, res)=>{
  res.send('hello world');
});

app.listen(port, ()=> console.log(`server running on port ${port}`));
