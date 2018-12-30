const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    firstName:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    handle:{
        type: String,
        required: true,
        max: 40
    },
    education: [
        {
            school:{
                type: String,
                required: true
            },
            degree:{
                type: String,
                required: true
            },
            major:{
                type: String,
                required: true
            },
            minor:{
                type: String
            },
            from:{
                type: Date,
                required: true
            },
            to:{
                type: Date
            },
            current:{
                type: Boolean,
                default: false
            },
            gpa:{
                type: Number
            },
            courses:[
                {
                    type: String
                }
            ],
        }
    ],
    experience: [
        {
            title: {
                type: String
            },
            company: {
                type: String
            },
            location: {
                type: String
            },
            from: {
                type: Date
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    skills: [
        {
            name:{
                type: String
            }
        }
    ],
    awards: [
        {
            name:{
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    interests:[
        {
            name:{
                type: String
            }
        }
    ]
})

module.exports = Profile = mongoose.model("profile", ProfileSchema);