let mongoose =require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User =mongoose.SchemaType(

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
username:
{
    type: String,
    default:"",
    trim: true,
    required:'username is required'

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