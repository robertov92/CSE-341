const taRoutes = require('express').Router();

taRoutes
    .use('/01', require('./ta01'))
    .use('/02', require('./ta02').router)
    .use('/03', require('./ta03'))
    .use('/04', require('./ta04'))

module.exports = taRoutes;