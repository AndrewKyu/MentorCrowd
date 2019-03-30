const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema
const ConversationSchema = new Schema({
 user:[{
    type: Schema.Types.ObjectId,
    ref: "users"
  }]
});

module.exports = Conversation = mongoose.model("conversation", ConversationSchema);
