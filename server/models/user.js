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