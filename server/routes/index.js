var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index')
let gameController = require('../controllers/game')
let surveyController = require('../controllers/survey')

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET products page. */
router.get('/products', indexController.displayProductsPage);

/* GET services page. */
router.get('/services', indexController.displayServicesPage);

/* GET contact us page. */
router.get('/survey-list', surveyController.displaySurveyList);

/* GET contact us page. */
router.get('/game-list', gameController.displayGameList);

module.exports = router;
