const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
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
    });

const corsOptions = {
    origin: "https://<your_app_name>.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://roberto:Unoyuno5@cluster0.zwdeu.mongodb.net/Project1?retryWrites=true&w=majority";

mongoose
    .connect(
        'mongodb+srv://roberto:Unoyuno5@cluster0.zwdeu.mongodb.net/Project1?retryWrites=true&w=majority'
    )
    .then(result => {

        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });