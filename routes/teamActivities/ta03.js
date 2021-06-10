//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const https = require('https');

let url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json'
let body = "";

https.get(url, res => {

    res.on("data", chunk => {
        body += chunk;
    });

}).on("error", error => {
    console.error(error.message);
});

const ITEMS_PER_PAGE = 10;

router.get('/', (req, res, next) => {
    const page = req.query.page;

    res.render('pages/teamActivities/ta03', {
        title: 'Team Activity 03',
        path: '/ta03', // For pug, EJS 
        body: JSON.parse(body)
    });
});

module.exports = router;