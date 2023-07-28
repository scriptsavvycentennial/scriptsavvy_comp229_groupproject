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
File: contact.js
Date: 2023-07-27
*/

let express = require('express');
let router = express.Router();

let authenticationController = require('../controllers/authentication')

// Get Route for the Survey List page - READ Operation
router.get('/login', authenticationController.displayLoginPage);

// Get Route for the Survey List page - READ Operation
router.post('/login', authenticationController.processLoginPage);

// Get Route for displaying the Add page - CREATE Operation
router.get('/register', authenticationController.displayRegisterPage);

// Get Route for the Survey List page - READ Operation
router.post('/register', authenticationController.processRegisterPage);

module.exports = router;