const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const EventSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    event: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    location: {
        type: String,
        required: true
    },
    from: {
        type: String, 
        required: true
    },
    to: {
        type: String, 
        required: true
    },
    attendees: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            },
            name: {
                type: String
            },
            image: {
                type: String
            }
        }
    ],
    eventdate: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    minpoints: {
        type: Number
    }
});

module.exports = Event = mongoose.model("event", EventSchema);