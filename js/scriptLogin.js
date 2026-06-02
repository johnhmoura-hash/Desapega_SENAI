const email = document.getElementById('email');
const senha = document.getElementById('senha');
const form =document.getElementById('form')

form.addEventListener('submit', (e) =>{
    e.preventDefault();
  
        fetch("https://localhost:7132/usuario/login", {
        method: "POST",
        credentials:"include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email:document.getElementById("email").value,
            senha:document.getElementById("senha").value
        })
    })
    .then(data => {
        console.log("Sucesso:", data);
        window.location.href="index.html";
    })
});

function validarEmail(){
   const emailValor = email.value.trim();


    if(emailValor === ''){
        validarErro(email, 'Campo obrigatório');
        return false;
    } else if(!isEmail(emailValor)){
         validarErro(email, 'Campo obrigatório');
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
    campo.className = "campo error";
}

function validarSucesso(input){
    const campo = input.parentElement;
    const small = campo.querySelector("small");

    small.innerText = "";
    campo.className = "campo success";
}

function isEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.senai\.br$/.test(email);
}
