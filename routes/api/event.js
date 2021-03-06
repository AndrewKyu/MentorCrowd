const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Event Model Loaded
const Event = require('../../models/Events');
//Profile Model Loaded
const Profile = require("../../models/Profile");
//Validation
const validateEventInput = require('../../validation/events');

/*
----------------------------------------|
|    @route         GET api/events/test |
|    @description   Tests event route   | 
|    @access        Public              |
----------------------------------------|
*/
router.get('/test', (req, res) => res.json({ msg: "event works "}));

/*
---------------------------------------|
|    @route         GET api/events/all |
|    @description   Get events         | 
|    @access        Public             |
---------------------------------------|
*/
router.get("/all", passport.authenticate("jwt", { session: false }), (req, res) => {
    const errors = {};

    Event.find()
        .sort({ date: -1 })
        .populate("user")
        .then(events => res.json(events))
        .catch(err => res.status(404).json({ noeventsfound: "No Events Found "}));
});

/*
----------------------------------------|
|    @route         GET api/events/:id  |
|    @description   Get events by id    | 
|    @access        Public              |
----------------------------------------|
*/
router.get("/:id", (req, res) => {
    console.log("we here");
    Event.findById(req.params.id)
        .populate("user")
        .then(event => res.json(event))
        .catch(err => 
            res.status(404).json({ noeventfound: "No event found with that ID" })
        );
});

/*
----------------------------------------|
|    @route         POST api/events/    |
|    @description   Create Event        | 
|    @access        Private             |
----------------------------------------|
*/
router.post('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const newEvent = new Event({
        user: req.user.id,
        event: req.body.event,
        description: req.body.description,
        from: req.body.from,
        to: req.body.to,
        location: req.body.location, 
        minpoints: req.body.minpoints,
        eventdate: req.body.eventdate
    });
    
    newEvent.save().then(event => res.json(event));
});

router.post('/update/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const newEvent = {
        user: req.user.id,
        event: req.body.event,
        description: req.body.description,
        from: req.body.from,
        to: req.body.to,
        location: req.body.location, 
        minpoints: req.body.minpoints,
        eventdate: req.body.eventdate
    };

    Event.findOneAndUpdate(
        { _id: req.params.id },
        { $set: newEvent },
        {new: true}
    ).then(event => res.json(event));
});
/*
------------------------------------------------|
|    @route         POST api/events/attend/:id  |
|    @description   Like post                   | 
|    @access        Private                     |
------------------------------------------------|
*/
router.post(
    "/attend/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        
        Profile.findOne({ user: req.user.id }).then(profile => {
            Event.findById(req.params.id)
            .then(event => {
                //If the user doesn't have enough points, cannot attend event
                if((profile.mentorpoints.length < event.minpoints) && (req.user.id === event.user)){
                    return res.status(400).json({ notenoughpts: "You do not have enough points" });
                }
                //If user already hit "attend" cannot hit it again
                if(event.attendees.filter(attendee => attendee.user.toString() === req.user.id).length > 0){
                    return res.status(400).json({ alreadyattending: "User is already attending this event"});
                }

                //Adds json object to the back of attendees array
                event.attendees.unshift({ user: req.user.id, name: req.user.name, image: req.user.image });
                //Saves database
                event.save().then(event => res.json(event));
            })
            .catch(err => res.status(404).json({ eventnotfound: "No event found" }));
        }) 
    }
);
/*
--------------------------------------------------|
|    @route         POST api/events/unattend/:id  |
|    @description   Like post                     | 
|    @access        Private                       |
--------------------------------------------------|
*/
router.post(
    "/unattend/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Event.findById(req.params.id)
            .then(event => {
                if(event.attendees.filter(attendee => attendee.user.toString() === req.user.id).length == 0){
                    return res.status(400).json({ notattending: "You haven't RSVPed for this event yet"});
                }

                const removeIndex = event.attendees
                    .map(person => person.user.toString() === req.user.id.toString())
                    .indexOf(true);
                
                event.attendees.splice(removeIndex, 1);
                
                event.save().then(event => res.json(event));
        })
        .catch(err => res.status(404).json({ eventnotfound: "No event found" }));
        });
    }
);
/*
--------------------------------------------|
|    @route         DELETE api/events/:id   |
|    @description   Delete the event        | 
|    @access        Private                 |
--------------------------------------------|
*/
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        console.log(req.params.id);
        Event.findOneAndRemove({ _id: req.params.id }).then(() => {
            res.json({ success: true });
        })
    }
);
module.exports = router;