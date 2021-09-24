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
        const user = responseData.user.username;
        const token = responseData.jwt;
        
        exportUser(user)
        console.log("Utilisateur trouvé", token);
        setCookie(user, token, 365);
        // document.location.href="http://127.0.0.1:5500/pokemon.html"
    }).catch(error =>{
        console.log(error);
    })
    function setCookie(name,token,exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = name + "=" + token + ";" + expires + ";path=/;"+"SameSite=Lax";
    }
    export function exportUser(user) {
        return user;
    }
      
}