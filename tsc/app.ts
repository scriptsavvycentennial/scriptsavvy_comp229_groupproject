/* 
Group Members
	Alberto Mcwhirter-Javier	- 301203948 - amcwhir1@my.centennialcollege.ca 	- Lead Software Engineer
	Andre Henrique Moyses de Assis	- 301282773 - amoysesd@my.centennialcollege.ca 	- Project Manager
	Gregory Wheeler	 - 301306049 - gwheele4@my.centennialcollege.ca	- Security Programmer
	Noveen Mirza		- 301208653 - nmirza13@my.centennialcollege.ca	- Database Programmer
	Samiul Alim Rafid	 - 301244377- srafid1@my.centennialcollege.ca	- Web Designer
	Tahnee Pitter-Duncan 		- 300844090 - tpitterd@my.centennialcollege.ca 	- UI Programmer


Course Name: Web Application Development
Course Code:COMP229
Assignment: Group Project
File: app.js
Date: 2023-07-23
*/

var express = require('express');
var router = express.Router();

let createError = require('http-errors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// modules for authentication
let session = require('express-session')
let passport = require('passport')

//These are commented out because were declared and never read/used
//let passportLocal = require('passport-local')
//let localStrategy = passportLocal.Strategy;

let flash = require('connect-flash');

// database setup
let mongoose = require('mongoose');
let DB = require('./db.tsc');

let indexRouter = require('../routes/indexRoutes');
let usersRouter = require('../routes/usersRoutes');
let surveysRouter = require('../routes/surveyRoutes');
let contactsRouter = require('../routes/contactRoutes');

// point mongoose to the DB URI
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
})

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// implemente User Authentication Strategy
passport.use(User.createStrategy());

// Serialize User
passport.serializeUser(User.serializeUser());
// Deserialize User
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey-list', surveysRouter);
app.use('/contact-list', contactsRouter);

// catch 404 and forward to error handler
app.use(function(next: any) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' , isAuthenticated: req.isAuthenticated() , displayName: req.user ? req.user.displaName : ''});
});

module.exports = app;
