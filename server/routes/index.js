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
File: index.js
Date: 2023-07-23
*/

var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index')
let surveyController = require('../controllers/survey')
let contactController = require('../controllers/contact')
let loginController = require('../controllers/login')



/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET contact us page. */
router.get('/contact-list', contactController.displayContactList);

/* GET contact Survey Page. */
router.get('/survey-list', surveyController.displaySurveyList);

<<<<<<< HEAD
//Auth Routes

/* GET Route for displaying LogIn page. */
router.get('/login', indexController.displayLoginPage);

/* Post Route for processing LogIn page. */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying Register page */
router.get('/register', indexController.displayRegisterPage);

/* Post Route for processing Register page. */
router.post('/register', indexController.processRegisterPage);

/* GET Route for performing UserLogout */
router.get('/logout', indexController.performLogout);
=======
// Get Route for displaying the login page
router.get('/login', loginController.displayLoginPage);

// Post Route for processing the login page
router.post('/login', loginController.processLoginPage);

// Get Route for displaying the register page
router.get('/register', loginController.displayRegisterPage);

// Post Route for processing the register page
router.post('/register', loginController.processRegisterPage);

// Get route for performing UserLogout
router.get('/logout', loginController.performLogout);

>>>>>>> ddb5781a0184b08c0324c4889167b2904f9a2e45

module.exports = router;
