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

let Survey = require('../models/surveyModel');
let userSurveyTakingModel = require('../models/userSurveyTakingModel');
module.exports.displaySurveyList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let surveyList = yield Survey.find();
        // console.log(surveyList)
        res.render('survey/list', { title: 'Surveys', SurveyList: surveyList });//, isAuthenticated: req.isAuthenticated() === All of these are meant to be after surveyList (paste the comma too)
    }
    catch (err) {
        console.error(err);
    }
});
module.exports.displayAddPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('survey/add', { title: 'Create a new Survey'}); //, isAuthenticated: req.isAuthenticated() 
    }
    catch (err) {
        console.error(err);
    }
});
module.exports.processAddPage = async (req, res, next) => {
    try {
        const { title } = req.body;
        const questionKeys = Object.keys(req.body).filter(key => key.startsWith('questions_'));
        const choiceKeys = Object.keys(req.body).filter(key => key.startsWith('choices_'));

        // Check if at least one question and choice were provided
        if (questionKeys.length === 0 || choiceKeys.length === 0) {
            return res.status(400).send("At least one question and choice are required.");
        }

        const questionArray = questionKeys.map((questionKey, index) => ({
            question: req.body[questionKey],
            choices: req.body[choiceKeys[index]].split(',').map(choice => choice.trim()),
        }));

        const newSurvey = new Survey({
            title,
            questions: questionArray,
        });

        await newSurvey.save();
        res.redirect('/survey-list');
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error.");
    }
};

module.exports.displayEditPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    console.log('Hello?1');
    try {
        let surveyToEdit = yield Survey.findById(id);
        res.render('survey/edit', { title: 'Edit Survey', survey: surveyToEdit}); //, isAuthenticated: req.isAuthenticated() 
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
module.exports.processEditPage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, questions, choices } = req.body;

        // Split questions and choices into arrays
        const questionArray = questions.map((question, index) => ({
            question,
            choices: choices[index].split(',').map(choice => choice.trim()),
        }));

        const updatedSurvey = {
            title,
            questions: questionArray,
        };

        console.log('Hello?');
        // Update the survey using the Survey model
        await Survey.updateOne({ _id: id }, updatedSurvey);

        res.redirect('/survey-list');
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    }
};

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

//Survey taking stuff
exports.displayForm = async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        res.render('survey/take-form', { title: 'Take survey', survey });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
exports.submitForm = async (req, res) => {
    try {
        const surveyId = req.params.id; // Assuming you pass the survey ID in the URL
        const answers = [];

        // Extract answers from the request body
        for (let i = 0; i < req.body.answers.length; i++) {
            const answer = req.body[`answers_${i}`];
            answers.push(answer);
        }

        const survey = await Survey.findById(surveyId);

        if (!survey) {
            return res.status(404).render('error', { message: 'Survey not found' });
        }

        const userSurveyTaking = new userSurveyTakingModel({
            survey: surveyId,
            user: "Name" ,//req.user._id, // Assuming you have authentication and a User model
            answers: survey.questions.map((question, index) => ({
                question: question.question,
                answer: answers[index],
            })),
        });

        await userSurveyTaking.save();

        res.redirect('/survey-list'); // Redirect back to the survey list page
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Internal server error' });
    }
};

//# sourceMappingURL=surveyController.js.map