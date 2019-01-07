const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema
const MessengeSchema = new Schema({
conversationId:{
    type: Schema.Types.ObjectId,
    required: true
 },
message:{
      type: String,
      required: true
  },
user:{
      type: Schema.Types.ObjectId,
      ref: "users"
  },
date: {
      type: Date
  }
});

module.exports = Message = mongoose.model("message", MessengeSchema);
