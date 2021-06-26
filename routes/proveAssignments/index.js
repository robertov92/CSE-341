const express = require('express');
const proveRoutes = express.Router();

const prove08 = require('../../controllers/proveAssignments/prove08');
const prove09 = require('../../controllers/proveAssignments/prove09');
const prove10 = require('../../controllers/proveAssignments/prove10');

// Prove08
proveRoutes.get('/prove08', prove08.processJson)
    .post('/prove08', prove08.getIndex);

// Prove 09
proveRoutes.get('/prove09', prove09.getPokemons)
    .get('/prove09/:page', prove09.getPokemonsPage);

// Prove10
proveRoutes.get('/prove10', prove10.corsAuthorization, prove10.getIndex)
    .get('/prove10/fetchAll', prove10.corsAuthorization, prove10.fetchAll)
    .post('/prove10/insert', prove10.corsAuthorization, prove10.insert);

module.exports = proveRoutes;