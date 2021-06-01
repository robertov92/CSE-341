const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');

const User = require('../../models/project1/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.getSignup = (req, res, next) => {
    res.render('pages/project1/signup', {
        pageTitle: 'Sign-up',
        errorMessage: req.flash('error'),
        oldInput: { email: '', password: "", confirmPassword: "" },
        validationErrors: []
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('pages/project1/signup', {
            pageTitle: 'Sign-up',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password,
                confirmPassword: req.body.confirmPassword
            },
            validationErrors: errors.array()
        });
    }
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            });
            return user.save();
        })
        .then(() => {
            res.redirect('/project1/login');

            return transporter.sendMail({
                to: email,
                from: 'vil13004@byui.edu',
                subject: 'Signup succeeded',
                html: '<h1>Success!</h1>'
            });

        }).catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

exports.getLogin = (req, res, next) => {
    res.render('pages/project1/login', {
        pageTitle: 'Login',
        errorMessage: req.flash('error'),
        oldInput: { email: '', password: '' },
        validationErrors: []
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('pages/project1/login', {
            pageTitle: 'Login',
            errorMessage: errors.array()[0].msg,
            oldInput: { email: email, password: password },
            validationErrors: errors.array()
        });
    }
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(422).render('pages/project1/login', {
                    pageTitle: 'Login',
                    errorMessage: 'Invalid email',
                    oldInput: { email: email, password: password },
                    validationErrors: []
                });
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
                    return res.status(422).render('pages/project1/login', {
                        pageTitle: 'Login',
                        errorMessage: 'Invalid email',
                        oldInput: { email: email, password: password },
                        validationErrors: []
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/project1/login');
                });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/project1/');
    });
};

exports.getReset = (req, res, next) => {
    res.render('pages/project1/reset', {
        pageTitle: 'Reset Password',
        errorMessage: req.flash('error')
    });
}

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/project1/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email }).then(user => {
                if (!user) {
                    req.flash('error', 'No account with that email found');
                    return res.redirect('/project1/reset');
                }

                // user.resetTokenExpiration = Date.now() + 3600000; // expiration not being saved at the moment
                user.resetToken = token;
                return user.save();
            })
            .then(result => {
                res.redirect('/project1/');
                transporter.sendMail({
                    to: req.body.email,
                    from: 'vil13004@byui.edu',
                    subject: 'Password reset',
                    html: `
                    <p>You requested a password reset!</p>
                    <p>Click this <a href="https://cse-341-roberto-villanueva.herokuapp.com/project1/reset${token}">link</a> to set a new password</p>
                    `
                });
            })
            .catch(err => {
                console.log(err);
                res.redirect('/project1/500');
            });
    });
}

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ resetToken: token })
        .then(user => {
            res.render('pages/project1/new-password', {
                pageTitle: 'New Password',
                errorMessage: req.flash('error'),
                userId: user.id.toString(),
                passwordToken: token
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });

}

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    // userId and passwordToken are passed correctly but the findOne function is not finding the user
    console.log(passwordToken);
    console.log(userId);

    User.findOne({
            resetToken: passwordToken //,
                //_id: userId
        })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then(result => {
            res.redirect('/project1/');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};