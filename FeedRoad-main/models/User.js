const mongoose = require('mongoose');

//const Schema=mongoose.Schema;
const { Schema } = mongoose;

//build the schema 

const userSchema = new Schema({
    googleId: String, //properties of record:type
    credits: { type: Number, default: 0 }
});

//asking mongoose to create a collection of name user of particular schema
mongoose.model('users', userSchema);