const pokemonDiv = document.querySelector(".row");
const url = "http://localhost:1337"
let AllPokemon = [];

// const connectUserForm = document.forms.connect;
// const inputLogin =  connectUserForm.login;
// const inputPassword = connectUserForm.password;
// console.log(inputLogin);

// connectUserForm.addEventListener("submit", login)

init();

function init() {
    getPokemon();
}
function getPokemon() {
    fetch(`${url}/pokemons`)
    .then(data => data.json())
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
    const inputLoginValue = inputLogin.value.trim()
    const inputPasswordValue = inputPassword.value.trim()
    console.dir(inputLoginValue,inputPasswordValue)
    const payload = {
        username: inputLoginValue,
        password: inputPasswordValue
    }
    fetch(`${url}/connect/`, {
        method: "POST",
        headers :{
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(payload),
    }).then(response => {
        console.log(response);
    })
}