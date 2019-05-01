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
  sentRequest: [{
    user: {
      type: Schema.Types.ObjectId,
      ref:"users"
    }
  }],
  request: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  }],
  connectionList: [{
    connectionId: {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  }],
  totalRequest:{
    type: Number,
    default: 0
  }
});

module.exports = User = mongoose.model("users", UserSchema);
