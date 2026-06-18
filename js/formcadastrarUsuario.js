const myForm = document.getElementById('cadastrar');
const senha = document.getElementById('senha');
const numMatricula = document.getElementById('numMatricula');
const numTelefone = document.getElementById('numTelefone');
const email = document.getElementById('email');
const emailConfirmar = document.getElementById('emailConfirmar');
const confirmarSenha = document.getElementById('confirmarSenha');

myForm.addEventListener('submit', function (event) {

    event.preventDefault();

   /* const valido =
        validarNome() &&
        validarMatricula() &&
        validarNumTelefone() &&
        validarEmail() &&
        validarConfirmarEmail()&&
        validarSenha() &&
        validarconfirmarSenha();

    if (valido) {
         enviarProduto();
    }

function enviarProduto(){*/
    fetch('https://localhost:7132/usuario/cadastrar', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Nome: document.getElementById("nome").value,
            Matricula: document.getElementById("numMatricula").value,
            Email: document.getElementById("email").value,
            Telefone: document.getElementById("numTelefone").value,
            Senha: document.getElementById("senha").value,
            Status_usuario: true,
        }),
    })
      
    .then(response => response.json())
    .then(data => {

        console.log("Sucesso:", data);

        alert("Conta criada com sucesso!");

        myForm.reset();

    })
    .catch(error => {
       
    });
});
if (numTelefone) numTelefone.addEventListener("keyup", validarNumTelefone);
function validarNumTelefone() {

    const numLimpo = numTelefone.value.replace(/\D/g, '');

    if (numLimpo === '') {
        validarErro(numTelefone, 'Campo obrigatório');
       return false;

    } else if (numLimpo.length !== 11) { 
        validarErro(numTelefone, 'Formato incorreto');
        return false;

    } else {
        
        numTelefone.value = numLimpo.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        );

    }

}
/*
if (nome) nome.addEventListener("keyup", validarNome);
if (senha) senha.addEventListener("keyup", validarSenha);
if (numMatricula) numMatricula.addEventListener("keyup", validarMatricula);
if (numTelefone) numTelefone.addEventListener("keyup", validarNumTelefone);
if (email) email.addEventListener("keyup", validarEmail);
if (emailConfirmar) emailConfirmar.addEventListener("keyup", validarConfirmarEmail);
if (confirmarSenha) confirmarSenha.addEventListener("keyup", validarconfirmarSenha);



function validarNome(){ 
    const nomeValor = nome.value.trim();
    
    if(nomeValor === ''){
        validarErro(nome, 'Campo obrigatório')
        return false;
    } else if(nomeValor.length < 3) {
          validarErro(nome, 'Campo obrigatório')
        return false;
    }else{
        validarSucesso(nome);
        return true;
    }
}

function validarMatricula(){
     const numMatriculaValor = numMatricula.value.trim();   

    if(numMatriculaValor === ''){
        validarErro(numMatricula, 'Campo obrigatório')
        return false;
    } else if(numMatriculaValor.length !== 7){
        validarErro(numMatricula, 'A matrícula deve conter 7 números')
        return false;
    }else{
        validarSucesso(numMatricula)
        return true;
    }

}
function validarNumTelefone() {

    const numLimpo = numTelefone.value.replace(/\D/g, '');

    if (numLimpo === '') {
        validarErro(numTelefone, 'Campo obrigatório');
       return false;

    } else if (numLimpo.length !== 11) { 
        validarErro(numTelefone, 'Formato incorreto');
        return false;

    } else {
        
        numTelefone.value = numLimpo.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        );

        validarSucesso(numTelefone);
        return true;
    }

}

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

function validarConfirmarEmail(){
    const emailValor = email.value.trim();
    const emailConfirmarValor = emailConfirmar.value.trim();

    if(emailConfirmarValor === ''){
        validarErro(emailConfirmar, 'Campo obrigatório');
       return false;
    } else if(emailValor !== emailConfirmarValor){
        validarErro(emailConfirmar, 'Os emails não coincidens');
        return false;
    }else{
        validarSucesso(emailConfirmar);
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
function validarconfirmarSenha(){
    const confirmarSenhaValor = confirmarSenha.value.trim();
    const senhaValor = senha.value.trim();

    

    if(confirmarSenhaValor === ''){
        validarErro(confirmarSenha, 'Campo obrigatório');
       return false;
    } else if(confirmarSenhaValor !== senhaValor){
        validarErro(confirmarSenha, 'As senhas não coincides');
       return false;
    }else{
        validarSucesso(confirmarSenha);
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
}*/
function validarSucesso(input){
    const campo = input.parentElement;
    const small = campo.querySelector("small");

    small.innerText = "";
    campo.className = "campo success";
}