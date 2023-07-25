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
