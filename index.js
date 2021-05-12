const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

const project1 = require('./routes/project1');
const teamActivities = require('./routes/teamActivities');

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(bodyParser({ extended: false }))
    .use('/project1', project1)
    .use('/ta', teamActivities)
    .get('/', (req, res, next) => {
        res.render('pages/index', { title: 'Welcome to my CSE341 repo', path: '/' });
    })
    .use((req, res, next) => {
        res.render('pages/404', { title: '404 - Page Not Found', path: req.url })
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));