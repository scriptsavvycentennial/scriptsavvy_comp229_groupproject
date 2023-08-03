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
let Survey = surveyModel;
module.exports.displaySurveyList = async (req: any, res: any) => {
    try {
        let surveyList = await Survey.find();
        // console.log(surveyList)

        res.render('survey/list', {
            title: 'Surveys', 
            SurveyList: surveyList,
            displayName: req.user ? req.user.displayName : '' 
            ,isAuthenticated: req.isAuthenticated()})
    } catch (err) {
        console.error(err);
    }
};

module.exports.displayAddPage = async (req: any, res: any) =>{
    try {
        res.render('survey/add', {
            title: 'Create a new Survey',
            displayName: req.user ? req.user.displayName : '' 
            ,isAuthenticated: req.isAuthenticated()})
    } catch (err) {
        console.error(err);
    }
};

module.exports.processAddPage = async (req: any, res: any) =>{
    let newSurvey = new Survey({
        "title": req.body.title,
        "question": req.body.question
    });

    try{
        await newSurvey.save();
        res.redirect('/survey-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.displayEditPage = async (req: any, res: any) =>{
    let id = req.params.id;

    try {
        let surveyToEdit = await Survey.findById(id);
        res.render('survey/edit', {
            title: 'Edit Survey', 
            survey: surveyToEdit,
            displayName: req.user ? req.user.displayName : '' 
            ,isAuthenticated: req.isAuthenticated()});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.processEditPage = async (req: any, res: any) =>{
    let id = req.params.id;
    let updatedSurvey = {
        "title": req.body.title,
        "question": req.body.question
    };

    try {
        await Survey.updateOne({_id: id}, updatedSurvey);
        res.redirect('/survey-list');
    } catch (err) {
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