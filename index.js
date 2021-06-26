const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const PORT = process.env.PORT || 5000;

const MONGODB_URI = 'mongodb+srv://roberto:Unoyuno5@cluster0.zwdeu.mongodb.net/Project1?retryWrites=true&w=majority';

const app = express();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: 'sessions' });

app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }));
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

const project1 = require('./routes/project1');
const proveAssignments = require('./routes/proveAssignments');
const teamActivities = require('./routes/teamActivities');

const User = require('./models/project1/user');

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            res.locals.cartItems = user.cart.items.length;
            next();
        })
        .catch(err => {
            throw new Error(err);
        });

});

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(bodyParser({ extended: false }))
    .use(bodyParser.json())
    .use('/project1', project1)
    .use('/ta', teamActivities)
    .use('/prove', proveAssignments)
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
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });