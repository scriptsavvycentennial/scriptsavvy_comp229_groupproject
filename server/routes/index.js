/* 
Group Members: 	Alberto Mcwhirter-Javier	- 301203948 - amcwhir1@my.centennialcollege.ca 	- Lead Software Engineer
		Andre Henrique Moyses de Assis	- 301282773 - amoysesd@my.centennialcollege.ca 	- Project Manager
		Gregory Wheeler	 - 301306049 - gwheele4@my.centennialcollege.ca	- Security Programmer
		Noveen Mirza		- 301208653 - nmirza13@my.centennialcollege.ca	- Database Programmer
		Samiul Alim Rafid	 - 301244377- srafid1@my.centennialcollege.ca	- Web Designer
		Tahnee Pitter-Duncan 		- 300844090 - tpitterd@my.centennialcollege.ca 	- UI Programmer

Curse Name: Web Application Development
Curse Code:COMP229
Assignment: Group Project
File: index.js
Date: 2023-07-23
*/

var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index')
let surveyController = require('../controllers/survey')
let contactController = require('../controllers/contact')

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET contact us page. */
router.get('/contact-list', contactController.displayContactList);

/* GET contact us page. */
router.get('/survey-list', surveyController.displaySurveyList);

module.exports = router;
