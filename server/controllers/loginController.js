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
File: index.js
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
module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        res.render('auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
};
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        //server err?
        if (err) {
            return next(err);
        }
        // if there is a user login err?
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server err?
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};
module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        res.render('auth/register', {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
};
module.exports.processRegisterPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield User.findOne({
            email: req.body.email
        });
        // If a user with email already exists, return an error
        if (existingUser) {
            req.flash('registerMessage', 'Registration Error: Email already in use!');
            return res.render('auth/register', {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else {
            // instantiate an user object
            let newUser = new User({
                username: req.body.username,
                email: req.body.email,
                displayName: req.body.displayName
            });
            User.register(newUser, req.body.password, (err) => {
                if (err) {
                    console.log(err);
                    console.log("Error: Inserting New User");
                    if (err.name == "UserExistsError") {
                        req.flash('registerMessage', 'Registation Error: User Already Exists!');
                        console.log('Error: User Already Exists!');
                    }
                    return res.render('auth/register', {
                        title: "Register",
                        messages: req.flash('registerMessage'),
                        displayName: req.user ? req.user.displayName : ''
                    });
                }
                else {
                    // if registration is successful
                    return passport.authenticate('local')(req, res, () => {
                        res.redirect('/');
                    });
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
});
module.exports.performLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            //handle error here
            console.log(err);
            return next(err);
        }
        return res.redirect('/');
    });
};
//# sourceMappingURL=loginController.js.map