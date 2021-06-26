// dummyData is an object copied from the JSON file and
// will be deleted once the server is turned off.
// if you want the data to persist, you can use the 'fs' or a database
const dummyData = require('../../data/prove10.json');

exports.getIndex = (req, res, next) => {
    res.render('pages/proveAssignments/prove10', { path: '/prove10' });
}

// response from this request is the dummyData in JSON format
// you can check it out by typing the path '/pages/proveAssignments/prove10/fetchAll' in the browser
exports.fetchAll = (req, res, next) => {
    res.json(dummyData);
};

exports.insert = (req, res, next) => {
    if (req.body.newName !== undefined) {
        // From the request, takes the newName value. You don't see it because it is a post request
        const newName = req.body.newName;

        if (!dummyData.avengers.some(a => a.name === newName)) {
            // push new object into dummyData
            dummyData.avengers.push({ name: newName });
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
}


// These authorizations allow other applications to access my data from other ports
exports.corsAuthorization = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};