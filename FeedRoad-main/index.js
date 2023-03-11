const express = require('express');// imported the express library
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();//express app created,


app.use(bodyParser.json());


//to manage cookie session(two args added:maxAge and keys for encryptions)
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,

    keys: [keys.cookieKey]
})
);
//code for lettimg passport to aware that i needs to use cookies to keep track of currently signed users!!
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);//when we need the Routes File it will return a function, which will run taking app as an argument
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);


// //additional code for only heroku
if (process.env.NODE_ENV === 'production') {
    //express will serve up production assets
    //like our main.js file,or main.css file

    app.use(express.static('client/build'));


    //express will serve up the index.html file
    //if it doesnt recongnize the route

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}


const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("express is live");