const pokemonDiv = document.querySelector(".row");
const url = "http://localhost:1337"
const connectUserForm = document.forms.connect;
const inputLogin =  connectUserForm.login;
const inputPassword = connectUserForm.password;

connectUserForm.addEventListener("submit", login);

function login(e) {
    e.preventDefault();
    const email = inputLogin.value.trim()
    const password = inputPassword.value.trim()

    const data = {
        identifier:email,
        password:password
    }

    fetch(`${url}/auth/local`, {
        method: "POST",
        headers :{
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(responseData => {
        if (responseData.errors) {
            throw new Error(
                "Validation échouée ! l'utilisateur n'existe pas"
            );
        }
        const username = responseData.user.username;
        const token = responseData.jwt;
        var user = { 'user': username, 'jwt': token};

        localStorage.setItem("Utilisateur", JSON.stringify(user));
    
        console.log("Utilisateur trouvé", token);
        document.location.href="http://127.0.0.1:5500/StrapiApiFront/pokemon.html";
    }).catch(error =>{
        console.log(error);
    })

      
}