const express = require('express');
const proveRoutes = express.Router();

const prove08 = require('../../controllers/proveAssignments/prove08');

proveRoutes.get('/prove08', prove08.processJson)
    .post('/prove08', prove08.getIndex);

module.exports = proveRoutes;