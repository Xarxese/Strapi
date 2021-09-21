'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
    var axios = require('axios');
    var Pokedex = require('pokedex-promise-v2');
    var P = new Pokedex();
    let allType = [];
    var config = {
    method: 'get',
    url: 'https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0',
    headers: { }
    };

    

    axios(config)
    .then(function (response) {
        response.data.results.forEach(function(pokemon){    
            let pokemonName = pokemon.name;
            createPokemon(pokemonName);
           })
           strapi.services.pokemon_types.create({
                type_id: 1
            })
    })
    .catch(function (error) {
    console.log(error);
    });

    function createPokemon(e) {
        // console.log(e);
        P.getPokemonByName(e) // with Promise
        .then(function(response) {
            // console.log(response.types);
            // strapi.services.pokemons.create({
            //     number: response.id,
            //     name: response.name,
            //     picture: response.sprites.other.dream_world.front_default,
            // })

            response.types.forEach(element => {
                let type = element.type.name;
                // strapi.services.PokemonType.create({
                //     type_id: type.id
                // })
                if (allType.includes(type)) {
                    // console.log(type+" existe déjà dans le tableau alors on ne push pas");
                } else {
                    // console.log(type+" n'existe pas dans le tableau alors on le push");
                    allType.push(type);
                   
                }
            });  
        })
        .catch(function(error) {
        console.log('There was an ERROR: ', error);
        });
    }
    // setTimeout( createType, 30000);
    // function createType() {
    //     console.log("fonction lancée");
    //     // console.log(allType);
    //     if (allType.length >= 17) {
    //         allType.forEach(element => {
    //             strapi.services.type.create({
    //                 value: element
    //             })
    //             // strapi.services.PokemonType.create({
    //             //     id: resp.id
                    
    //             // })
    
    //         });
    //     }
        
    // }
};
