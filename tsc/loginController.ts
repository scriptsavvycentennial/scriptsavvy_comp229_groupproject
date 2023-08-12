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

module.exports.displayLoginPage = (req: any, res: any) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
};

module.exports.processLoginPage = (req: any, res: any, next: any) => {
    passport.authenticate('local',
    (err: any, user: typeof User) => {
        //server err?
        if(err)
        {
            return next(err);
        }
        // if there is a user login err?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err: any) => {
            //server err?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

module.exports.displayRegisterPage = (req: any, res: any) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
};

module.exports.processRegisterPage = async (req: any, res: any, next: any) => {
    try
    {
        const existingUser = await User.findOne(
            { 
                email: req.body.email 
            });

        // If a user with email already exists, return an error
        if (existingUser) 
        {
            req.flash(
                'registerMessage', 
                'Registration Error: Email already in use!');

            return res.render('auth/register', 
            {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else 
        {
            // instantiate an user object
            let newUser = new User({
                username: req.body.username,
                email: req.body.email,
                displayName: req.body.displayName
            });

            User.register(newUser, req.body.password, (err: any) => {
                if(err)
                {
                    console.log(err);
                    console.log("Error: Inserting New User");
                    if(err.name == "UserExistsError")
                    {
                        req.flash(
                            'registerMessage',
                            'Registation Error: User Already Exists!'
                        );
                        console.log('Error: User Already Exists!');
                    }
                    return res.render('auth/register',
                    {
                        title: "Register",
                        messages: req.flash('registerMessage'),
                        displayName: req.user ? req.user.displayName : ''
                    });
                }
                else
                {
                    // if registration is successful
                    return passport.authenticate('local')(req, res, () => {
                        res.redirect('/')
                    });
                }
            });
        }
    }
    catch (err) 
    {
        console.log(err);
        return next(err);
    }
};

module.exports.performLogout = (req: any, res: any, next: any) => {
    req.logout((err: any) => {
        if (err) {
            //handle error here
            console.log(err);
            return next(err);
        }
        return res.redirect('/');
    });
}

