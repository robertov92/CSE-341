const express = require('express');
const proveRoutes = express.Router();

const prove08 = require('../../controllers/proveAssignments/prove08');
const prove09 = require('../../controllers/proveAssignments/prove09');

proveRoutes.get('/prove08', prove08.processJson)
    .post('/prove08', prove08.getIndex);

proveRoutes.get('/prove09', prove09.getPokemons)
    .get('/prove09/:page', prove09.getPokemonsPage);

module.exports = proveRoutes;