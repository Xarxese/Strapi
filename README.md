# Strapi application
My API get the first 151 pokemons from another API and adds their values in the correct content-type
# Strapi
Strapi is the leading open-source headless CMS. It’s 100% JavaScript, fully customizable and developer-first.
See more https://strapi.io/
## Content-type  
-   Pokemons (All information about the pokemon: image, name, number )
-   PokemonsType (Relational table with pokemons[id] and type[id] )
-   Type (All type of pokemon )
## BootStrap.js 
-   I launch a "https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0" request on which i get the data from pokeapi 
    and i iterate to create the pokemon and the types .