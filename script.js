/* Tela de Login*/
const form = document.getElementById('form');
const nome = document.getElementById('usuario'); 
const senha = document.getElementById('senha');
const numMatricula = document.getElementById('numMatricula');
const numTelefone = document.getElementById('numTelefone');
const email = document.getElementById('email');
const emailConfirmar = document.getElementById('emailConfirmar');
const confirmarSenha = document.getElementById('confirmarSenha');



if(form){
form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const valido =

        validarNome() &&
        validarMatricula() &&
        validarNumTelefone() &&
        validarEmail() &&
        validarConfirmarEmail()&&
        validarSenha() &&
        validarconfirmarSenha();

    if (valido) {
        enviarFormulario();
    }
});

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
        validarErro(numTelefone, 'Campo obrigatório');
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
        validarErro(email, 'Campo obrigatório')
        return false;
    } else if(!isEmail(emailValor)){
         validarErro(email, 'Campo obrigatório')
        return false;
    }else{
        validarSucesso(email)
        return true;
    } 
}

function validarConfirmarEmail(){
    const emailValor = email.value.trim();
    const emailConfirmarValor = emailConfirmar.value.trim();

    if(emailConfirmarValor === ''){
        validarErro(emailConfirmar, 'Campo obrigatório')
       return false;
    } else if(emailValor !== emailConfirmarValor){
        validarErro(emailConfirmar, 'Os emails não coincidens')
        return false;
    }else{
        validarSucesso(emailConfirmar)
       return true;
    } 
}

function validarSenha(){
    const senhaValor = senha.value.trim();


    if(senhaValor === ''){
        validarErro(senha, 'Campo obrigatório')
        return false;
    } else if(senhaValor.length < 8){
        validarErro(senha, 'A senha deve ter no mínino 8 caracteres')
        return false;
    }else{
        validarSucesso(senha)
        return true;
    }

}
function validarconfirmarSenha(){
    const confirmarSenhaValor = confirmarSenha.value.trim();
    const senhaValor = senha.value.trim();

    

    if(confirmarSenhaValor === ''){
        validarErro(confirmarSenha, 'Campo obrigatório')
       return false;
    } else if(confirmarSenhaValor !== senhaValor){
        validarErro(confirmarSenha, 'As senhas não coincides')
       return false;
    }else{
        validarSucesso(confirmarSenha)
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
function enviarFormulario() {

    const dados = {
        nome: nome.value,
        matricula: numMatricula.value,
        telefone: numTelefone.value,
        email: email.value,
        senha: senha.value
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Sucesso:", data);
        alert("Conta criada com sucesso!");
    })
    .catch(error => {
        console.error("Erro:", error);
    });

}
}

//Form feira de trocas
const formFeira = document.getElementById('formFeira');
if(formFeira){
formFeira.addEventListener('submit', (e) =>{
    e.preventDefault();

    enviarFormulario();
}); 

function enviarFormulario() {

    const dados = {
        nome: nome.value,
        matricula: numMatricula.value,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Sucesso:", data);
        alert("Inscrição a com sucesso!");
    })
    .catch(error => {
        console.error("Erro:", error);
    });

}
}




//botão de ver senha

const bnt_eye = document.querySelector('#versenha');

if(bnt_eye){
bnt_eye.addEventListener('click', ()=>{
    const inputSenha = document.querySelector('#senha');

    if(inputSenha.getAttribute('type') == 'password'){
       inputSenha.setAttribute('type', 'text');
       bnt_eye.classList.remove('ri-eye-line');
       bnt_eye.classList.add('ri-eye-off-line');

    }else{
        inputSenha.setAttribute('type', 'password');
        bnt_eye.classList.remove('ri-eye-off-line');
        bnt_eye.classList.add('ri-eye-line');
    }
})
}
const bnt_eyeConfirm = document.querySelector('#verconfirmesenha');

if(bnt_eyeConfirm){
bnt_eyeConfirm.addEventListener('click', ()=>{
    let inputSenhaConfirm = document.querySelector('#confirmarSenha');

    if(inputSenhaConfirm.getAttribute('type') == 'password'){
       inputSenhaConfirm.setAttribute('type', 'text');
        bnt_eyeConfirm.classList.remove('ri-eye-line');
        bnt_eyeConfirm.classList.add('ri-eye-off-line');
    }else{
        inputSenhaConfirm.setAttribute('type', 'password');
        bnt_eyeConfirm.classList.remove('ri-eye-off-line');
        bnt_eyeConfirm.classList.add('ri-eye-line');
    }
})
}

/* slider */

let imgSlider = document.querySelectorAll('.slider-box');
let btnNav = document.querySelectorAll('.btn-nav');

let contadorImg = imgSlider.length;
let imgAtiva = 0;
if(imgSlider){
function mostrarSlider(){

    let antigaImg = document.querySelector('.slider-box.ativo')
    let antigoBtnNav = document.querySelector('.btn-nav.ativo');

    antigaImg.classList.remove('ativo')
    antigoBtnNav.classList.remove('ativo');

    imgSlider[imgAtiva].classList.add('ativo');
    btnNav[imgAtiva].classList.add('ativo');
}

function iniciarAutoPlay(){
    intervalo = setInterval(() => {
        imgAtiva++;

        if(imgAtiva >= contadorImg){
            imgAtiva = 0;
        }

        mostrarSlider();
    }, 2500);
}

btnNav.forEach((btn, indice)=>{
    btn.addEventListener('click', ()=>{
        imgAtiva = indice;
        mostrarSlider();
    });
});

iniciarAutoPlay();
}


function selecionar(botao, tipo) {

  // Remove seleção de todos
  const botoes = document.querySelectorAll(".mensagens button");
  botoes.forEach(btn => btn.classList.remove("ativo"));

  // Marca o clicado
  botao.classList.add("ativo");

  // (se quiser continuar usando a função de mensagem)
  usarMensagem(tipo);
}