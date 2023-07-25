/* 
Group Members
	Alberto Mcwhirter-Javier	- 301203948 - amcwhir1@my.centennialcollege.ca 	- Lead Software Engineer
	Andre Henrique Moyses de Assis	- 301282773 - amoysesd@my.centennialcollege.ca 	- Project Manager
	Gregory Wheeler	 - 301306049 - gwheele4@my.centennialcollege.ca	- Security Programmer
	Noveen Mirza		- 301208653 - nmirza13@my.centennialcollege.ca	- Database Programmer
	Samiul Alim Rafid	 - 301244377- srafid1@my.centennialcollege.ca	- Web Designer
	Tahnee Pitter-Duncan 		- 300844090 - tpitterd@my.centennialcollege.ca 	- UI Programmer


Curse Name: Web Application Development
Curse Code:COMP229
Assignment: Group Project
File: survey.js
Date: 2023-07-23
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Survey Model
let Survey = require('../models/survey');

let surveyController = require('../controllers/survey')

// Get Route for the Survey List page - READ Operation
router.get('/', surveyController.displaySurveyList);

// Get Route for displaying the Add page - CREATE Operation
router.get('/add', surveyController.displayAddPage);

// Post Route for processing the Add Page - CREATE Operation
router.post('/add', surveyController.processAddPage);

// Get Route for displaying the Edit Page - UPDATE Operation
router.get('/edit/:id', surveyController.displayEditPage);

// Post Route for processing the Edit Page - UPDATE Operation
router.post('/edit/:id', surveyController.processEditPage);

// Get to perform Deletion - DElETE Operation
router.get('/delete/:id', surveyController.performDelete);

module.exports = router;