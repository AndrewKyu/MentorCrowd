const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  connectionList: [{
    connectionId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
  }],
  sentRequests: [{
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
    }
  }],
  requests: [{
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
  }]
});

module.exports = User = mongoose.model("users", UserSchema);
