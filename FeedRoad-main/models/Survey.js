const mongoose = require('mongoose');

//const Schema=mongoose.Schema;
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

//build the schema 

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],//to add sub document collection
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },//every survey is going to belong a particular user//relationship field
    dateSent: Date,
    lastResponded: Date
});


mongoose.model('surveys', surveySchema);