# Strapi application
- My API get the first 151 pokemons from another API and adds their values in the correct content-type.
# Strapi
- Strapi is the leading open-source headless CMS. It’s 100% JavaScript, fully customizable and developer-first.
- See more https://strapi.io/
## Content-type 👨‍💻
-   Pokemons (All information about the pokemon: image, name, number).
-   Type (All types of pokemon).
-   Relational table with pokemons[id] and type[id] ManyToMany.
## BootStrap.js 👨‍💻
-   I launch a "https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0" request on which i get the data from pokeapi.
    and i iterate to create the pokemon and the types.
## Client 🧐
-   Extract the zip folder "StrapiApiFront".
## My notes📖
-   Work time : 20 hours.
-   https://www.notion.so/Test-N-2-bee28eefee354f3ebac8e61f668764ae
## Test Project on local machine 🤓
-   npm run develop.
-   Sign-up on http://localhost:1337/admin.
-   Create a new user with role authenticate.
-   In parameter check if role authenticate is on find, findone for pokemons.
-   Run live serve on file StrapiApiFront.

## KNOW BUGS ! 🤔
- 100 Max query to get each pokemon in DB.
- The types are not correctly related to the pokemon but you can attribute manually types for each pokemons.