"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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

module.exports.displaySurveyList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let surveyList = yield Survey.find();
        // console.log(surveyList)
        res.render('survey/list', {
            title: 'Surveys',
            SurveyList: surveyList,
            displayName: req.user ? req.user.displayName : '',
            isAuthenticated: req.isAuthenticated()
        });
    }
    catch (err) {
        console.error(err);
    }
});
module.exports.displayAddPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('survey/add', {
            title: 'Create a new Survey',
            displayName: req.user ? req.user.displayName : '',
            isAuthenticated: req.isAuthenticated()
        });
    }
    catch (err) {
        console.error(err);
    }
});
module.exports.processAddPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newSurvey = new Survey({
        "title": req.body.title,
        "question": req.body.question
    });
    try {
        yield newSurvey.save();
        res.redirect('/survey-list');
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
module.exports.displayEditPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        let surveyToEdit = yield Survey.findById(id);
        res.render('survey/edit', {
            title: 'Edit Survey',
            survey: surveyToEdit,
            displayName: req.user ? req.user.displayName : '',
            isAuthenticated: req.isAuthenticated()
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
module.exports.processEditPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let updatedSurvey = {
        "title": req.body.title,
        "question": req.body.question
    };
    try {
        yield Survey.updateOne({ _id: id }, updatedSurvey);
        res.redirect('/survey-list');
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
module.exports.performDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        yield Survey.findByIdAndRemove(id);
        res.redirect('/survey-list');
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
//# sourceMappingURL=surveyController.js.map