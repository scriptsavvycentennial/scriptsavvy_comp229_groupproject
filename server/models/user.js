<<<<<<< HEAD
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username:
        {
            type: String,
            default: "",
            trim: true,
            required: 'Username is required.'
        },
        email:
        {
            type: String,
            default: "",
            trim: true,
            required: 'Email Address is required.'
        },
        displayName:
        {
            type: String,
            default: "",
            trim: true,
            required: 'Display Name is required.'
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        update:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'users'
    }
);

// Configure options for User Model

let options = ({missingPasswordError: 'Wrong / Missing Password'});
User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);
=======
let mongoose =require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User =mongoose.Schema(

{
username:
{
    type: String,
    default:"",
    trim: true,
    required:'username is required'

},
email:
{
    type: String,
    default:"",
    trim: true,
    required:'email is required'

},
displayName:
{
    type: String,
    default:"",
    trim: true,
    required:'displayname is required'

},
created:{
    type:Date,
    default: Date.now
},
update:
{
    type: Date,
    defualt: Date.now
}

},

{
    collection: 'users'
}

);
//configure options for user model
let options = (
    {
        missingPasswordError: "wrong / missing PASSWORD"
    }
);
User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);
>>>>>>> ddb5781a0184b08c0324c4889167b2904f9a2e45
