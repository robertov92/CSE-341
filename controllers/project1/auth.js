exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    res.render('pages/project1/login', {
        pageTitle: 'Login'
    });
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/project1/');
};