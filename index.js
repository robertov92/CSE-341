const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const PORT = process.env.PORT || 5000;

const MONGODB_URI = 'mongodb+srv://roberto:Unoyuno5@cluster0.zwdeu.mongodb.net/Project1?retryWrites=true&w=majority';

const app = express();
const store = new MongoDBStore({uri: MONGODB_URI, collection: 'sessions'});

app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false , store: store}));

const project1 = require('./routes/project1');
const teamActivities = require('./routes/teamActivities');

const User = require('./models/project1/user');

app.use((req, res, next) => {
    User.findById('60a0553aadd4910004c7f31d')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

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
    origin: "https://cse-341-roberto-villanueva.herokuapp.com/",
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

mongoose
    .connect(
        MONGODB_URI
    )
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'roberto',
                    email: 'roberto@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });