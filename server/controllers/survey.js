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

//experimental branch
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = async (req, res, next) => {
    try {
        let surveyList = await Survey.find();
        // console.log(surveyList)

        res.render('survey/list', {title: 'Surveys', SurveyList: surveyList})
    } catch (err) {
        console.error(err);
    }
};

module.exports.displayAddPage = async (req, res, next) =>{
    try {
        res.render('survey/add', {title: 'Create a new Survey'})
    } catch (err) {
        console.error(err);
    }
};

module.exports.processAddPage = async (req, res, next) => {
    try {
      let { title, questions, choices } = req.body;
  
      // Split questions and choices into arrays
      if (questions !== null) {
        questions = questions.split(',');
        choices = choices.split(',');
      } else {
        questions = [];
        choices = [];
      }
  
      // Create an array of objects to store questions and their respective choices
      const questionArray = questions.map((question, index) => ({
        question,
        choices: choices.slice(index * 3, (index + 1) * 3), // Assuming each question has up to 3 choices
      }));
  
      let newSurvey = new Survey({
        title,
        questions: questionArray,
      });
  
      await newSurvey.save();
      res.redirect('/survey-list');
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };

module.exports.displayEditPage = async (req, res, next) =>{
    let id = req.params.id;

    try {
        let surveyToEdit = await Survey.findById(id);
        res.render('survey/edit', {title: 'Edit Survey', survey: surveyToEdit});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.processEditPage = async (req, res, next) =>{
    let id = req.params.id;
    let {title, questions, choices} = req.body;

    questions = questions.split(',');
    choices = choices.split(',');

    const questionArray = questions.map((question, index) => ({question,
    choices: choices.slice(index * 3, (index + 1) * 3),
}));
    let updatedSurvey = {title, question: questionArray};

    try{
        await Survey.updateOne({ _id:id}, updatedSurvey);
        res.redirect('/survey-list');
    }   catch(err){
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.performDelete = async (req, res, next) =>{
    let id = req.params.id;

    try {
        await Survey.findByIdAndRemove(id);
        res.redirect('/survey-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};