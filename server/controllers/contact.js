let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Contact = require('../models/contact');

module.exports.displayContactList = async (req, res, next) => {
    try {
        let contactList = await Contact.find();
        // console.log(contactList)

        res.render('contact/list', {title: 'Contact', ContactList: contactList})
    } catch (err) {
        console.error(err);
    }
};

module.exports.displayAddPage = async (req, res, next) =>{
    try {
        res.render('contact/add', {title: 'Add contact'})
    } catch (err) {
        console.error(err);
    }
};

module.exports.processAddPage = async (req, res, next) =>{
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

module.exports.displayEditPage = async (req, res, next) =>{
    let id = req.params.id;

    try {
        let contactToEdit = await Contact.findById(id);
        res.render('contact/edit', {title: 'Edit contact', contact: contactToEdit});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.processEditPage = async (req, res, next) =>{
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

module.exports.performDelete = async (req, res, next) =>{
    let id = req.params.id;

    try {
        await Contact.findByIdAndRemove(id);
        res.redirect('/contact-list');
    } catch (err) {
        onsole.log(err);
        res.status(500).send(err);
    }
};