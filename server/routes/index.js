var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index')
let gameController = require('../controllers/game')
let contactController = require('../controllers/contact')

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
router.get('/contact-list', contactController.displayContactList);

/* GET contact us page. */
router.get('/game-list', gameController.displayGameList);

module.exports = router;
