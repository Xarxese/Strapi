const pokemonDiv = document.querySelector(".row");
const url = "http://localhost:1337"
let AllPokemon = [];
const connectUserForm = document.forms.connect;
const inputLogin =  connectUserForm.login;
const inputPassword = connectUserForm.password;

const urlSite = window.location.href

console.log(urlSite);

connectUserForm.addEventListener("submit", login);

init();

function init() {
    if (urlSite == "http://127.0.0.1:5500/StrapiApiFront/pokemon.html") {
        getPokemon();
    }
}
function getPokemon() {
    fetch(`${url}/pokemons`,{
            method: "GET",
            headers :{
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMyMzQ4MjU3LCJleHAiOjE2MzQ5NDAyNTd9.51DR4g1vOQE63kcG3ZAHb0vj7Uiz8bGADk8zkBW6gqI",
                "Accept":"application/json",
                "Content-Type":"application/json",
            }
            }).then(data => data.json())
    .then(result =>{
        AllPokemon = result;
        console.log(AllPokemon);
        renderPokemon(AllPokemon);
    })
    .catch(err => {console.error(err)})
}
function renderPokemon(pokemons) {
    let list = [];
    const css = ["box-top twitter","box-top facebook","box-top instagram"];
    
    pokemons.forEach(e => {
        let random = Math.floor(Math.random() * css.length);
        const pokeCard = `
        <div class="col-lg-4 col-12 text-center">
            <div class="box-column">
                <div class="${css[random]}">
                    <img src="${e.picture}" alt="">
                </div>
                <div class="box-bottom">
                    <div class="box-title twitter-title">
                        ${e.name}
                    </div>
                    <div class="card" style="width: 18rem;">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bug</li>
                        <li class="list-group-item">Poison</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`;
        list = [...list, pokeCard]
        pokemonDiv.innerHTML = `${list.join("")}`
    });
}

function login(e) {
    e.preventDefault();
    const email = inputLogin.value.trim()
    const password = inputPassword.value.trim()

    const data = {
        identifier:email,
        password:password
    }

    fetch(`${url}/auth/local/register`, {
        method: "POST",
        headers :{
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMyMzQ4MjU3LCJleHAiOjE2MzQ5NDAyNTd9.51DR4g1vOQE63kcG3ZAHb0vj7Uiz8bGADk8zkBW6gqI",
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    }).then(response => {
        console.log('Well done!');
        console.log('User profile', response);
        // document.location.href="http://127.0.0.1:5500/StrapiApiFront/pokemon.html"
    }).catch(error =>{
        console.log(error);
    })
}