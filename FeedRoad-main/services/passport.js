//importing passport and passport startegy for oAUth process
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
//imported the schema in this file in a diff way so that we dont run into an error in tsting phase
const User = mongoose.model('users');//model class User created 


passport.serializeUser((user, done) => {
    done(null, user.id);// note:this user id is not google profile id,to uniquely identify our user inside of cookie ,we are not using google profle id we are gonna use ID that is assigned to this record by MONGO

})

passport.deserializeUser((id, done) => {

    User.findById(id)
        .then(user => {
            done(null, user);
        });


});




passport.use(new GoogleStrategy({

    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'

}, (accessToken, refreshToken, profile, done) => {

    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                done(null, existingUser);
            }
            else {
                //we create a new user
                //(--async process--)created an Model Instance of the user but its not in our remote db yet, until we call a method .save,
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));

            }
        });




}
)

);
