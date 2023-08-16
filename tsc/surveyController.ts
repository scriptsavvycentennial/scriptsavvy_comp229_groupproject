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
let Survey = require('../models/survey');

module.exports.displaySurveyList = async (req: any, res: any) => {
    try {
        let surveyList = await Survey.find();
        // console.log(surveyList)

        res.render('survey/list', {title: 'Surveys', SurveyList: surveyList}) //isAuthenticated: req.isAuthenticated() === All of these are meant to be after surveyList (paste the comma too)
    } catch (err) {
        console.error(err);
    }
};

module.exports.displayAddPage = async (req: any, res: any) =>{
    try {
        res.render('survey/add', {title: 'Create a new Survey'}) //,isAuthenticated: req.isAuthenticated()
    } catch (err) {
        console.error(err);
    }
};

//This function needs to be improved on
module.exports.processAddPage = async (req: any, res: any) => {
    try {
      let { title, questions, choices } = req.body;
  
      // Check if questions and choices are provided and not empty
      if (!questions || !choices) {
        return res.status(400).send("Questions and choices are required.");
      }
  
      // Split questions and choices into arrays
      questions = questions.split(',');
      choices = choices.split(',');
  
      // Create an array of objects to store questions and their respective choices
      const questionArray = questions.map((question: String, index: number) => ({
        question,
        choices: choices.slice(index * 3, (index + 1) * 3),
      }));
  
      let newSurvey = new Survey({
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

module.exports.displayEditPage = async (req: any, res: any) =>{
    let id = req.params.id;

    try {
        let surveyToEdit = await Survey.findById(id);
        res.render('survey/edit', {title: 'Edit Survey', survey: surveyToEdit}); //,isAuthenticated: req.isAuthenticated()
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.processEditPage = async (req: any, res: any) =>{
    let id = req.params.id;
    let {title, questions, choices} = req.body;

    questions = questions.split(',');
    choices = choices.split(',');

    const questionArray = questions.map((question: String, index: number) => ({question,
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

module.exports.performDelete = async (req: any, res: any) =>{
    let id = req.params.id;

    try {
        await Survey.findByIdAndRemove(id);
        res.redirect('/survey-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};