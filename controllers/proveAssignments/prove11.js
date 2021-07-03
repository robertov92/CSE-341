// nothing changed here from last week's assignment
const dummyData = require('../../data/prove10.json');

exports.getIndex = (req, res, next) => {
    res.render('pages/proveAssignments/prove11', { path: '/prove11' });
}

exports.fetchAll = (req, res, next) => {
    res.json(dummyData);
};

exports.insert = (req, res, next) => {
    if (req.body.newName !== undefined) {
        const newName = req.body.newName;

        if (!dummyData.avengers.some(a => a.name === newName)) {
            dummyData.avengers.push({ name: newName });
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
}

exports.corsAuthorization = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};