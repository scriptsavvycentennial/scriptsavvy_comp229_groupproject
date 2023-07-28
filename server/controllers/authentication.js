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
File: index.js
Date: 2023-07-23
*/

module.exports.displayLoginPage = async (req, res, next) =>{
    console.log('Hello?');
    try {
        res.render('authentication/login', {title: 'Login'})
    } catch (err) {
        console.error(err);
    }
};

module.exports.displayRegisterPage = async (req, res, next) =>{
    console.log('Hello?');
    try {
        res.render('authentication/register', {title: 'Register'})
    } catch (err) {
        console.error(err);
    }
};

module.exports.processLoginPage = async (req, res, next) => {

}
module.exports.processRegisterPage = async (req, res, next) => {
    
}

//Insert authentication stuff here (Login/register)