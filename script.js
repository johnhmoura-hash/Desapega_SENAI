/* Tela de Login*/
const form = document.getElementById('form');
const nome = document.getElementById('usuario'); 
const senha = document.getElementById('senha');
const numMatricula = document.getElementById('numMatricula');
const numTelefone = document.getElementById('numTelefone');
const email = document.getElementById('email');
const emailConfirmar = document.getElementById('emailConfirmar');


if(form){
form.addEventListener('submit', (e) =>{
    e.preventDefault();

    validarFormulario();
}); 

nome.addEventListener("keyup", validarNome);
senha.addEventListener("keyup", validarSenha);

function validarNome(){
  
    const nomeValor = nome.value.trim();
    
    let validNome = true;
   
    
    if(nomeValor === ''){
        validarErro(nome);
        validNome = false;
    } else if(nomeValor.length < 3) {
         validarErro(nome);
        validNome = false;
    }else{
        validarSucesso(nome);
        validNome = true;
    }
}

function validarSenha(){
    const senhaValor = senha.value.trim();

     let validSenha = true;

    if(senhaValor === ''){
        validarErro(senha)
        validSenha = false;
    } else if(senhaValor.length < 8){
        validarErro(senha)
        validSenha = false;
    }else{
        validarSucesso(senha)
        validSenha = true;
    }

    return validNome && validSenha;
}

function validarErro(input){
    const campo = input.parentElement;
    
    campo.className = 'campo error';
}

function validarSucesso(input){

    const campo = input.parentElement;

    campo.className = 'campo success';
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

let imgSlider = document.querySelectorAll('.slider-container .slider-box');
let btnNav = document.querySelectorAll('.btn-nav-box .btn-nav');

let contadorImg = imgSlider.length;
let imgAtiva = 0;
if(imgSlider){
function mostrarSlider(){

    let antigaImg = document.querySelector('.slider-container .slider-box.ativo')
    let antigoBtnNav = document.querySelector('.btn-nav-box .btn-nav.ativo');

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
