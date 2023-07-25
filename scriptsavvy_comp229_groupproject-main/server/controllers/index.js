var express = require('express');
var router = express.Router();

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'ScriptSavvy Homepage' });
};

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About Us' });
};

module.exports.displayContactList = (req, res, next) => {
    res.render('contact/list', { title: 'Contact Us' });
};

module.exports.displaySurveyList = (req, res, next) => {
    res.render('survey/list', { title: 'Survey list page' });
};