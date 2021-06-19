const fetch = require('node-fetch');

exports.getPokemon = (offset, callback) => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
        .then(response => response.json())
        .then(data => {
            callback(data.results);
            // I wanted to add the image of the pokemon. I am still working on this.
            // for (let pokemon of data.results) {
            //     fetch(pokemon.url)
            //         .then(pokResponse => pokResponse.json())
            //         .then(pokData => {
            //             console.log(pokData.name + " " + pokData.sprites.front_default);
            //         });
            // }
        });
};