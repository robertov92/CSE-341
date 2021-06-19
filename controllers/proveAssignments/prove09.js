const model = require('../../models/proveAssignments/prove09');

exports.getPokemons = (req, res) => {
    const page = 0;
    model.getPokemon(page, pokemons => {
        res.render('pages/proveAssignments/prove09', { pokemons, page });
    });
}

exports.getPokemonsPage = (req, res) => {
    const page = req.params.page;
    model.getPokemon(page, pokemons => {
        res.render('pages/proveAssignments/prove09', { pokemons, page });
    });
}