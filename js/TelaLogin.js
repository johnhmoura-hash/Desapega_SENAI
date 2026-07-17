// Tela de Login
const form = document.getElementById('form');
const senha = document.getElementById('senha');
const email = document.getElementById('email');


form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const valido =0

        validarEmail() &&
        validarSenha() 
       

    if (valido) {
           fetch("https://localhost:7132/usuario/login", {
        method: "POST",
        credentials:"include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email:document.getElementById("email"),
            senha:document.getElementById("senha")
        })
    })
    
    .then(data => {
        console.log("Sucesso:", data);
        window.location.href='index.html'
       
       
    })
    .catch(error => {
        console.error("Erro:", error);
        alert
    });

    }
});

if (senha) senha.addEventListener("keyup", validarSenha);
if (email) email.addEventListener("keyup", validarEmail);
 

function validarEmail(){
   const emailValor = email.value.trim();


    if(emailValor === ''){
        validarErro(email, 'Campo obrigatório');
        return false;
    } else if(!isEmail(emailValor)){
         validarErro(email, 'Email');
        return false;
    }else{
        validarSucesso(email);
        return true;
    } 
}



function validarSenha(){
    const senhaValor = senha.value.trim();


    if(senhaValor === ''){
        validarErro(senha, 'Campo obrigatório');
        return false;
    } else if(senhaValor.length < 8){
        validarErro(senha, 'A senha deve ter no mínino 8 caracteres');
        return false;
    }else{
        validarSucesso(senha);
        return true;
    }

}


function validarErro(input, mensagem){
    const campo = input.parentElement;
    const small = campo.querySelector("small");

    small.innerText = mensagem; // coloca o texto
    campo.className = "erro";
}

function validarSucesso(input){
    const campo = input.parentElement;
    const small = campo.querySelector("small");

    small.innerText = "";
    campo.className = "sucesso";
}

function isEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.senai\.br$/.test(email);
}


// Logout 


 






                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                