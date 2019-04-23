const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const textminer = require('text-miner');

const Datauri = require('datauri');
const path = require('path');
const { uploader } = require('../../config/cloudinaryConfig');
const cloudinary = require('cloudinary');
const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  //Reject a file 
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
};

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
const duri = new Datauri();

const dataUri = req =>
   duri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

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
|    @description   Get all profiles           | 
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
|    @description   Get profile by user id         | 
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
------------------------------------------------|
|    @route         POST api/profile/upload     |
|    @description   Upload profile picture      | 
|    @access        Private                     |
------------------------------------------------|
*/
router.post('/upload', 
            passport.authenticate('jwt', {session: false}), 
            upload.single('image'), 
            (req, res) => {

  if(req.file){
    const file = dataUri(req).content;
    uploader.upload(file)
      .then(result => {
        if(result) req.user.image = cloudinary.url(result.public_id, 
                                    {width: 200, 
                                      height: 200, 
                                      crop: "thumb", 
                                      gravity: "face"
                                    });
        Profile.findOne({ user: req.user.id }).then(profile => {
          req.user
            .save()
            .then(result => {
              res.status(201).json({
                message: "photo uplaoded"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "Something went wrong",
          err: err
        });
      });
  }
});

router.post(
  '/rateup/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Profile.findById(req.params.id)
      .then(profile => {
        if(profile.mentorpoints.filter(point => point.user.toString() === req.user.id).length > 0
        ){
          return res.status(400).json({ alreadyrated: "user already rated this profile" });
        }

        profile.mentorpoints.unshift({ user: req.user.id });

        profile.save().then(profile => res.json(profile));
      })
    })
    .catch(err => res.status(404).json({ profilenotfound: "No profile found" }));
  }
)
/*
------------------------------------------------|
|    @route         POST api/profile/awards     |
|    @description   Add awards to profile       | 
|    @access        Private                     |
------------------------------------------------|
*/
// router.post(
//   '/awards', 
//   passport.authenticate('jwt', { session: false}), 
//   (req, res) => {
//     const { errors, valid } = validateAwardInput(req.body);
    
//     if(!valid){
//       return res.status(404).json(errors);
//     }

//     Profile.findOne({ user: req.user.id }).then(profile => {
//       const newAward = {};

//       if(req.body.title) newAward.title = req.body.title;
//       if(req.body.description) newAward.description = req.body.description;

//       // Add to exp array
//       profile.awards.unshift(newAward);

//       profile.save().then(profile => res.json(profile));
//     });

// });
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
|    @access        Public                                 |
-----------------------------------------------------------|
*/
router.get('/match/:handle', function(req, res, next) {
  var my_corpus = new textminer.Corpus([]);
  user = "";
  Profile.findOne({handle: req.params.handle})
  .populate("user")
  .then(profile1 => {
    if(!profile1){
      errors.noprofile = "There's no profile for this user";
      res.status(404);
    }
    base_user = profile1.handle.toString();
    my_corpus.addDoc(profile1.skills.toString());
    res.json(profile1);
  })
  //.catch(err => res.status(404).json(err));


   Profile.find()
    .populate("user")
    .then(profiles => {
      if(!profiles){
        errors.noprofile = "There are no profiles";
        res.status(404).json(errors);
      }
      
      for(mov = 0; mov <profiles.length; mov++){
       //console.log(profiles[mov].skills);
      
       //adds all Users skills to the corpus
       if(base_user != profiles[mov].handle.toString()){
        my_corpus.addDoc(profiles[mov].skills.toString());
       }
       
      }

      my_corpus.toUpper();
      my_corpus.removeInvalidCharacters();
      my_corpus.removeInterpunctuation();
      my_corpus.clean();

      //creating the termdoc matrix
      var terms = new textminer.DocumentTermMatrix(my_corpus);
      terms.fill_zeros();

      //print basic info about matrix
      console.log(terms.vocabulary);
      console.log(terms.data);
      console.log(terms.nDocs);
      console.log(terms.nTerms);


      var iter;
      var iter2;
      var iter3;
      var iMax = terms.nDocs;
      var jMax = terms.nDocs;
      var counter = new Array();
      var match = new Array();
      var terms_doc1 = 0;
      for(mover = 0; mover < terms.nDocs;mover++){
        match[mover] = 0;
        counter[mover] = 0;
      }
      

       
        //iterates through potential users
        for(iter = 1; iter < terms.nDocs; iter++){
          
         //iterates through terms
           for(iter2 = 0; iter2 < terms.nTerms; iter2++){
            
            if(terms.data[0][iter2] >= 1){
             terms_doc1 +=1;
             if(terms.data[iter][iter2] >= 1){
              counter[iter] += 1;
             }
            }            
           }
           if(counter[iter] >= terms_doc1 / 4){   //user2 has 1/4 of user1's keywords
             //set match for these 2
             match[iter] = true;
             //recommend user2 to user1
             console.log("Matched", profiles[mov].handle.toString());
           }
           terms_doc1 = 0;
           // else{
           //   //remove match for these 2, no need since default is false

           // }
         }
       










      //res.json(profiles[7].skills); //shows naruto skils for now

    })
    .catch(err => res.status(404).json({profile: "There are no profiles"}));



  








  }
);
module.exports = router;