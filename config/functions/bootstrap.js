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
    const typeAlreadyPush = [];
    const PokemonAlreadyPush = [];
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
    })
    .catch(function (error) {
    console.log(error);
    });

    function createPokemon(e) {
        P.getPokemonByName(e) // with Promise
            .then(function(response) {
                console.log(response);
                let nameCurrent = response.name;
                let typeArray = []
                
                response.types.forEach(e => {
                    let type = e.type.name;
                    typeArray.push(type);

                });
                console.log("-------\n"
                            +nameCurrent+
                            "\n-------\n"
                            +typeArray+
                            "\n-------");
                
                // ! Tant que mon tableau temporaire typeArray[]  contiens au moins 2 valeures
                // ! Alors on procéde a la création du type dans DB
                // ! Si le tableau typeAlreadyPush[] contient déjà le type à l'index[0] dans typeArray[] alors on supprime cette valeur de typeArray[]
                //  ! Sinon on envoie cette valeur dans typeAlreadyPush[] puis on crée le type puis on le supprime de ce tableau

                while (typeArray.length <= 2 && typeArray.length != 0) {
                    console.log("Envoie du type");
                    
                    if (typeAlreadyPush.includes(typeArray[0])) {
                        console.log("Si le type est inclus dans le tableaux on le retire: "+typeArray);
                        typeArray.shift();
                    } else{
                        console.log("on envoie le type :"+typeArray+" dans le tableau \n ---------------------\n  puis on creé le type dans la DB");
                        typeAlreadyPush.push(typeArray[0])
                        strapi.services.type.create({
                            value: typeArray[0],
                            pokemons: response.id
                        })
                        typeArray.shift();
                    }
                    
                }
                if (PokemonAlreadyPush.includes(nameCurrent)) {
                    console.log('pokemon déjà créer');
                    console.log(PokemonAlreadyPush);

                } else {
                    console.log('pokemon pas créer');
                    PokemonAlreadyPush.push(nameCurrent);

                    strapi.services.pokemons.create({
                        number: response.id,
                        name: response.name,
                        picture: response.sprites.other.dream_world.front_default,
                        types : [response.id]
                    })
                }
                
            })
            .catch(function(error) {
            console.log('There was an ERROR: ', error);
            });
    }
};
