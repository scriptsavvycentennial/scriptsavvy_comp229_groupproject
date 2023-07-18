let mongoose = require('mongoose');

//create a model class
let contactModel = mongoose.Schema({
    fullName: String,
    phoneNumber: Number,
    message: String,
    rating: Number
},
{
    collection: 'contactMessages'
});

module.exports = mongoose.model('Contact', contactModel);