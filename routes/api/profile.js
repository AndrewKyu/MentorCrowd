const express = require('express');
const router = express.Router();
const goose = require('mongoose');
const passport = require('passport');
const textminer = require('../../node_modules/text-miner/lib/index.js');

//Importing Profile Model
const Profile = require('../../models/Profile');
//Importing User Model
const User = require('../../models/User');



//Validation Inputs
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require("../../validation/education");

/*
------------------------------------------------|
|    @route         GET api/profile/test        |
|    @description   Tests profile route         | 
|    @access        Public                      |
------------------------------------------------|
*/
router.get('/test', (req, res)=> res.json({msg: "Profile works"}));


/*
------------------------------------------------|
|    @route         GET api/profile/            |
|    @description   Get Current User Profile    | 
|    @access        Private                     |
------------------------------------------------|
*/
router.get(
    '/', 
    passport.authenticate('jwt', {session: false}), 
    (req, res) => {
        const errors = {};

        Profile.findOne({user: req.user.id})
        .populate("user")
        .then(profile => {
            if(!profile){
                errors.noprofile = "There is no profile for this user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

/*
-----------------------------------------------|
|    @route         GET api/profile/all        |
|    @description   Get profile by handle      | 
|    @access        Public                     |
-----------------------------------------------|
*/
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user")
    .then(profiles => {
      if(!profiles){
        errors.noprofile = "There are no profiles";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({profile: "There are no profiles"}));
});

/*
---------------------------------------------------|
|    @route         GET api/profile/handle/:handle |
|    @description   Get profile by handle          | 
|    @access        Public                         |
---------------------------------------------------|
*/
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({handle: req.params.handle})
    .populate("user")
    .then(profile => {
      if(!profile){
        errors.noprofile = "There's no profile for this user";
        res.status(404);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/*
---------------------------------------------------|
|    @route         GET api/profile/user/:user_id  |
|    @description   Get profile by handle          | 
|    @access        Public                         |
---------------------------------------------------|
*/
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({user: req.params.user_id})
    .populate("user")
    .then(profile => {
      if(!profile){
        errors.noprofile = "There's no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json("There's no profile for this user"));
});


/*
------------------------------------------------|
|    @route         POST api/profile/           |
|    @description   Create or edit user profile | 
|    @access        Private                     |
------------------------------------------------|
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    //Skills - Split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    if(typeof req.body.interests !== "undefined"){
      profileFields.interests = req.body.interests.split(",");
    }

    //Social Media
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;


    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create

        //Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          //Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

/*
------------------------------------------------|
|    @route         POST api/profile/experience |
|    @description   Add experience to profile   | 
|    @access        Private                     |
------------------------------------------------|
*/
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Query the database to find the user
    Profile.findOne({ user: req.user.id }).then(profile => {
      
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

/*
------------------------------------------------|
|    @route         POST api/profile/education  |
|    @description   Add education to profile    | 
|    @access        Private                     |
------------------------------------------------|
*/
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {};

      if(req.body.school) newEdu.school = req.body.school;
      if(req.body.degree) newEdu.degree = req.body.degree;
      if(req.body.major) newEdu.major = req.body.major;
      if(req.body.minor) newEdu.minor = req.body.minor;
      if(req.body.from) newEdu.from = req.body.from;
      if(req.body.to) newEdu.to = req.body.to;
      if(req.body.current) newEdu.current = req.body.current;
      if(req.body.gpa) newEdu.gpa = req.body.gpa;
      if(req.body.description) newEdu.description = req.body.description;

      if (typeof req.body.courses !== "undefined") {
        newEdu.courses = req.body.courses.split(",");
      }

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

/*
-----------------------------------------------------------|
|    @route         DELETE api/profile/experience/:exp_id  |
|    @description   Delete experiences from profile        | 
|    @access        Private                                |
-----------------------------------------------------------|
*/
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //Splice out of array
        profile.experience.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

/*
-----------------------------------------------------------|
|    @route         DELETE api/profile/education/:edu_id   |
|    @description   Delete education from profile          | 
|    @access        Private                                |
-----------------------------------------------------------|
*/
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //Splice out of array
        profile.education.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

/*
----------------------------------------------|
|    @route         DELETE api/profile        |
|    @description   Delete user and profile   | 
|    @access        Private                   |
----------------------------------------------|
*/
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

/*
-----------------------------------------------------------|
|    @route                                                |
|    @description   Match user profiles                    | 
|    @access        Private                                |
-----------------------------------------------------------|
*/
router.get('/match', function(req, res, next) {

  var select = req.query.select;

  Profile.find({}, function(err, founddata){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
      if(founddata.length == 0){
          var responseObject = undefined;
          if(select && select == 'count'){
            responseObject = {count: 0};
          }
          res.status(404).send(responseObject);
      }
      else{
        var responseObject = founddata;
        if(select && select == 'count'){
          responseObject = {count: founddata.length};
        }
        /*  Utilizing text miner to return best matches for user
        Parse response object into separate strings using end of profile characteritic set in model
        using the string split method
        add these separate strings into separate documents
        create a corpus with string of documents
        create term docs matrix 

        */

      //  console.log(responseObject[0]);
      //  console.log("_________________");
      //  console.log(responseObject[1]);
      //  console.log("_________________");
      //  console.log(responseObject[2]);
      //  console.log("_________________");
      //  console.log(responseObject[2].toString());

       var my_corpus = new textminer.Corpus([]);
       var temp = responseObject[0].toString();
       var quotes = temp.split("'");
       var bracket1 = quotes.toString().split("[");
       var bracket2 = bracket1.toString().split("]");
       var slash = bracket2.toString().split("\\");
       var g = slash.toString().split("skills:");
       var x = g[1].toString();
       var y = x.split("interests:");
       //console.log(g[0]);
       //console.log("_____________________________________________");
       //console.log(g[1]);
     
       //console.log("_____________________________________________");
       //console.log(y[0]);
       //console.log("_____________________________________________");
       //console.log(y[1]);
       //responseObject[0].toString(temp);
       my_corpus.addDoc(y[0].toString());


       temp = responseObject[1].toString();
       quotes = temp.split("'");
       bracket1 = quotes.toString().split("[");
       bracket2 = bracket1.toString().split("]");
       slash = bracket2.toString().split("\\");
       g = slash.toString().split("skills:");
       x = g[1].toString();
       y = x.split("interests:");
       //console.log(y[0]);
       my_corpus.addDoc(y[0].toString());


       temp = responseObject[2].toString();
       quotes = temp.split("'");
       bracket1 = quotes.toString().split("[");
       bracket2 = bracket1.toString().split("]");
       slash = bracket2.toString().split("\\");
       g = slash.toString().split("skills:");
       x = g[1].toString();
       y = x.split("interests:");
       //console.log(y[0]);
       my_corpus.addDoc(y[0].toString());



       //my_corpus.addDoc(responseObject[0].toString());
       //my_corpus.addDoc(responseObject[1].toString());
       //my_corpus.addDoc(responseObject[2].toString());
       my_corpus.toUpper();
       my_corpus.removeInvalidCharacters();
       my_corpus.removeInterpunctuation();
       
       //my_corpus.clean();
       my_corpus.removeWords(""); // need to remove chars from string not corpis

       my_corpus.setAttributes([
        { 'user': 'Andrew' },
        { 'user': 'Cindy' },
        { 'user': 'Stephen' },
      ]);

      var userSkills = my_corpus.groupBy( function group( text, attr ) {
        return attr.user;
      });

      console.log( 'Andrew: ' );
      console.log( userSkills[ 'Andrew' ] );
      console.log( 'Cindy: ' );
      console.log( userSkills[ 'Cindy' ] );
      console.log( 'Stephen: ' );
      console.log( userSkills[ 'Stephen' ] );





       var terms = new textminer.DocumentTermMatrix(my_corpus);
       terms.fill_zeros();
       //var weighted = weightTfIdf( terms );
       //console.log(terms.weighting(TfIdf));
       console.log(terms.vocabulary);
       console.log(terms.data);
       terms.weightTfIdf;
       terms.removeSparseTerms( 0 );
       //console.log(terms.findFreqTerms( 1 ));


       console.log(terms.vocabulary);
       console.log(terms.data);
       console.log(terms.nDocs);
       console.log(terms.nTerms);

       //terms.removeSparseTerms( 10 );
       //terms.weighting(weightTfIdf( terms ));


      //  console.log(terms.nDocs);
      //  console.log(terms.nTerms);
      //  console.log(terms.vocabulary);
      //  console.log(terms.data);






       res.send(responseObject);
       //res.send(responseObject[1]);
       //res.send(responseObject[2]);
       //res.send("______________________________");
      }
    }
  })


  // Profile.find()
  //   .populate("user")
  //   .then(profiles => {
  //     if(!profiles){
  //       errors.noprofile = "There are no profiles";
  //       res.status(404).json(errors);
  //     }
  //     res.json(profiles);
  //   })
  //   .catch(err => res.status(404).json({profile: "There are no profiles"}));


});

module.exports = router;