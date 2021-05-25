const bcrypt = require('bcryptjs');

const User = require('../../models/project1/user');

exports.getSignup = (req, res, next) => {
    res.render('pages/project1/signup', {
        pageTitle: 'Sign-up',
        errorMessage: req.flash('error')
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'Email already exists'); // error messages for email
                return res.redirect('/project1/signup')
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return user.save();
                })
                .then(() => {
                    res.redirect('/project1/login')
                });
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getLogin = (req, res, next) => {
    res.render('pages/project1/login', {
        pageTitle: 'Login',
        errorMessage: req.flash('error')
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email'); // error messages for email
                return res.redirect('/project1/login');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true; // sets isLoggedIn to true
                        req.session.user = user;
                        // saves the user into the session
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/project1');
                        });
                    }
                    req.flash('error', 'Invalid password'); // error messages for password
                    res.redirect('/project1/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/project1/login');
                });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/project1/');
    });
};