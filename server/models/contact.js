<<<<<<< HEAD
/* 
Group Members: 	Alberto Mcwhirter-Javier	- 301203948 - amcwhir1@my.centennialcollege.ca 	- Lead Software Engineer
		Andre Henrique Moyses de Assis	- 301282773 - amoysesd@my.centennialcollege.ca 	- Project Manager
		Gregory Wheeler	 - 301306049 - gwheele4@my.centennialcollege.ca	- Security Programmer
		Noveen Mirza		- 301208653 - nmirza13@my.centennialcollege.ca	- Database Programmer
		Samiul Alim Rafid	 - 301244377- srafid1@my.centennialcollege.ca	- Web Designer
		Tahnee Pitter-Duncan 		- 300844090 - tpitterd@my.centennialcollege.ca 	- UI Programmer

Curse Name: Web Application Development
Curse Code:COMP229
Assignment: Group Project
File: contact.js
Date: 2023-07-23
*/

=======
>>>>>>> f8849ecf643a0012d6e3d3d3d79f5912298c8a44
let mongoose = require('mongoose');

//create a model class
let contactModel = mongoose.Schema({
    fullName: String,
    phoneNumber: Number,
    message: String,
    rating: Number
},
{
    collection: 'contactMessages'
});

<<<<<<< HEAD
module.exports = mongoose.model('contact', contactModel);
=======
module.exports = mongoose.model('Contact', contactModel);
>>>>>>> f8849ecf643a0012d6e3d3d3d79f5912298c8a44
