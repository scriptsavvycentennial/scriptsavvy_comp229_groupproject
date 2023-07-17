var express = require('express');
var router = express.Router();

module.exports.displayHomePage = (req, res, next) => {
    res.render('homepage', { title: 'ScriptSavvy Homepage' });
};

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About' });
};

module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', { title: 'Products' });
};

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services' });
};

module.exports.displaySurveyList = (req, res, next) => {
    res.render('survey/list', { title: 'Survey page' });
};

module.exports.displayGameList = (req, res, next) => {
    res.render('game/list', { title: 'Game list page' });
};