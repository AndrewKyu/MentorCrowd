const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    image:{
        type: String
    },
    handle:{
        type: String,
        required: true,
        max: 40
    },
    company:{
        type: String
    },
    website:{
        type: String
    },
    location: {
        type: String
    },
    status:{
        type: String,
        required: true
    },
    bio:{
        type: String
    },
    githubusername:{
        type: String
    },
    mentorpoints: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
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
                type: String
            },
            courses:{
                    type: [String]
            },
            description:{
                type: String
            }
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
    skills: {
                type: [String],
                required: true
    },
    awards: [
        {
            title: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    interests:{
                type: [String]
    },
    social: {
        youtube:{
            type: String
        },
        twitter:{
            type: String
        },
        facebook:{
            type: String
        },
        linkedin:{
            type: String
        },
        instagram:{
            type: String
        }
    }
})

module.exports = Profile = mongoose.model("profile", ProfileSchema);
