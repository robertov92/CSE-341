const project1Routes = require('express').Router();

project1Routes.get('/', (req, res, next) => {
    res.render('pages/project1');
});

module.exports = project1Routes;