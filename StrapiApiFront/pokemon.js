const pokemonDiv = document.querySelector(".row");
const url = "http://localhost:1337"
let AllPokemon = [];

init();

function init() {

    let data = JSON.parse(localStorage.getItem("Utilisateur"));
    console.log(data.user);
    console.log(data.jwt);
    if (data != "") {
        let username = data.user;
        let jwt = data.jwt;
        getPokemon(jwt)
        document.getElementById("user").innerHTML= username;

    }
    
}


function getPokemon(jwt) {
    fetch(`${url}/pokemons`,{
            method: "GET",
            headers :{
                "Authorization": `Bearer ${jwt}`,
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
        console.log(e.types.length);
        let random = Math.floor(Math.random() * css.length);
        let types = []
        e.types.forEach(element => {
            types.push(element.value)
        });
        if (e.types.length == 2) {
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
                                    <li class="list-group-item">${types[0]}</li>
                                    <li class="list-group-item">${types[1]}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`;
                list = [...list, pokeCard]
                pokemonDiv.innerHTML = `${list.join("")}`
        }
        if (e.types.length == 0) {
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
                                <li class="list-group-item">Type non défini</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`;
            list = [...list, pokeCard]
            pokemonDiv.innerHTML = `${list.join("")}`
        }
        if (e.types.length == 1) {
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
                            <li class="list-group-item">${types[0]}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`;
            list = [...list, pokeCard]
            pokemonDiv.innerHTML = `${list.join("")}`
        }
        
        
    });
}