"use strict";
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
File: survey.js
Date: 2023-07-23
*/

const express = require('express');
var router = express.Router();
let surveyController = require('../controllers/surveyController')

function requireAuth(req, res, next) {
    //check is the user is LoggedIn
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
// Get Route for the Survey List page - READ Operation
router.get('/', surveyController.displaySurveyList);
// Get Route for displaying the Add page - CREATE Operation
router.get('/add',  surveyController.displayAddPage); //requireAuth,  All of the requireAuth are meant to be before the 'surveycontroller', after the comma
// Post Route for processing the Add Page - CREATE Operation
router.post('/add',  surveyController.processAddPage); //requireAuth,
// Get Route for displaying the Edit Page - UPDATE Operation
router.get('/edit/:id',  surveyController.displayEditPage); //requireAuth,
// Post Route for processing the Edit Page - UPDATE Operation
router.post('/edit/:id',  surveyController.processEditPage); //requireAuth,
// Get to perform Deletion - DElETE Operation
router.get('/delete/:id',  surveyController.performDelete); //requireAuth,
module.exports = router;
//# sourceMappingURL=surveyRoutes.js.map