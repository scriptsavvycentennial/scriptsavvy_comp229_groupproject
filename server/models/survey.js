let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema({
    fullName: String,
    phoneNumber: Number,
    message: String,
    rating: Number
},
{
    collection: 'surveyMessages'
});

module.exports = mongoose.model('survey', surveyModel);