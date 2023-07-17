let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema({
    title: String,
    question: String,
},
{
    collection: 'survey'
});

module.exports = mongoose.model('Survey', surveyModel);