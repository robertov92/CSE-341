//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const https = require('https');

let url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json'
let body = "";

https.get(url, function (res) {

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});

router.get('/',(req, res, next) => {
    res.render('pages/ta03', { 
        title: 'Team Activity 03', 
        path: '/ta03', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        body: JSON.parse(body)
    });
});

module.exports = router;