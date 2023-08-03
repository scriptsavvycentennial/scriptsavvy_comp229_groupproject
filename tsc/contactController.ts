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
File: contact.js
Date: 2023-07-23
*/

// create a reference to the model
let Contact = require('../models/contactModel');
import { Request, Response } from 'express';

module.exports.displayContactList = async (req: Request, res: Response) => {
    try {
        let contactList = await Contact.find();
        // console.log(contactList)

        res.render('contact/list', {title: 'Contact', ContactList: contactList ,isAuthenticated: req.isAuthenticated() , displayName: req.user ? String: ''})
    } catch (err) {
        console.error(err);
    }
};

module.exports.displayAddPage = async (req: Request, res: Response) =>{
    try {
        res.render('contact/add', {title: 'Add contact' ,isAuthenticated: req.isAuthenticated() , displayName: req.user ? String : ''})
    } catch (err) {
        console.error(err);
    }
};

module.exports.processAddPage = async (req: Request, res: Response) =>{
    let newContact = new Contact({
        "fullName": req.body.fullName,
        "phoneNumber": req.body.phoneNumber,
        "message": req.body.message,
        "rating": req.body.rating
    });

    try{
        await newContact.save();
        res.redirect('/contact-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.displayEditPage = async (req: Request, res: Response) =>{
    let id = req.params.id;

    try {
        let contactToEdit = await Contact.findById(id);
        res.render('contact/edit', {title: 'Edit contact', contact: contactToEdit ,isAuthenticated: req.isAuthenticated() , displayName: req.user ? String: ''});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.processEditPage = async (req: Request, res: Response) =>{
    let id = req.params.id;
    let updatedContact = {
        "fullName": req.body.fullName,
        "phoneNumber": req.body.phoneNumber,
        "message": req.body.message,
        "rating": req.body.rating
    };

    try {
        await Contact.updateOne({_id: id}, updatedContact);
        res.redirect('/contact-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.performDelete = async (req: Request, res: Response) =>{
    let id = req.params.id;

    try {
        await Contact.findByIdAndRemove(id);
        res.redirect('/contact-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};