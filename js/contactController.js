"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// create a reference to the model
let Contact = require('../models/contactModel');
module.exports.displayContactList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let contactList = yield Contact.find();
        // console.log(contactList)
        res.render('contact/list', { title: 'Contact', ContactList: contactList, isAuthenticated: req.isAuthenticated(), displayName: req.user ? String : '' });
    }
    catch (err) {
        console.error(err);
    }
});
module.exports.displayAddPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('contact/add', { title: 'Add contact', isAuthenticated: req.isAuthenticated(), displayName: req.user ? String : '' });
    }
    catch (err) {
        console.error(err);
    }
});
module.exports.processAddPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newContact = new Contact({
        "fullName": req.body.fullName,
        "phoneNumber": req.body.phoneNumber,
        "message": req.body.message,
        "rating": req.body.rating
    });
    try {
        yield newContact.save();
        res.redirect('/contact-list');
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
module.exports.displayEditPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        let contactToEdit = yield Contact.findById(id);
        res.render('contact/edit', { title: 'Edit contact', contact: contactToEdit, isAuthenticated: req.isAuthenticated(), displayName: req.user ? String : '' });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
module.exports.processEditPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let updatedContact = {
        "fullName": req.body.fullName,
        "phoneNumber": req.body.phoneNumber,
        "message": req.body.message,
        "rating": req.body.rating
    };
    try {
        yield Contact.updateOne({ _id: id }, updatedContact);
        res.redirect('/contact-list');
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
module.exports.performDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        yield Contact.findByIdAndRemove(id);
        res.redirect('/contact-list');
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
//# sourceMappingURL=contactController.js.map