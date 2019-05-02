const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema
const ConnectionSchema = new Schema({
 user:{
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  connections: [{
    connectionId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
  }],
  sentRequests: [{
    recipient:{
        type: Schema.Types.ObjectId,
        ref: "users"
    }
  }],
  requests: [{
    sender: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
  }]
});

module.exports = Connection = mongoose.model("connection", ConnectionSchema);
