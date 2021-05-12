//TA02 PLACEHOLDER
// This app makes use of basic principles of backend dev with node and express! 
const express = require('express');
const router = express.Router();

const users = [];

router.post('/addUser', (req, res, next) => {
    let repeated = 0;
    let message = "";
    users.forEach(element => {
        if (element == req.body.user) {
            repeated = 1;
            message = "Repeated User!";
        }
    });
    if (repeated != 1) users.push(req.body.user);
    res.render('pages/teamActivities/ta02', {
        title: 'Team Activity 02',
        path: '/ta02',
        users: users,
        message: message
    });
});

router.post('/removeUser', (req, res, next) => {
    users.splice(req.body.userToDelete, 1);
    res.render('pages/teamActivities/ta02', {
        title: 'Team Activity 02',
        path: '/ta02',
        users: users
    });
});

router.post('/removeUser2', (req, res, next) => {
    const index = users.indexOf(req.body.userToDelete);
    let message = "";
    if (index == -1) message = "User not found";
    else users.splice(index, 1);
    res.render('pages/teamActivities/ta02', {
        title: 'Team Activity 02',
        path: '/ta02',
        users: users,
        message: message
    });
});

router.get('/', (req, res, next) => {
    res.render('pages/teamActivities/ta02', {
        title: 'Team Activity 02',
        path: '/ta02',
        users: users
    });
});

exports.router = router;
exports.users = users;