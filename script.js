/* Tela de Login*/
const nome = document.getElementById('usuario'); 
const senha = document.getElementById('senha');
const form = document.getElementById('form');
let validNome = false;

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    validarFormulario();
});

nome.addEventListener("keyup", validarFormulario);

function validarFormulario(){
    const nomeValor = nome.value.trim();
    const senhaValor = senha.value.trim();
if(validNome){

}else{
    alert('ta vazio')
}
    if(nomeValor === ''){
        validarErro(nome, "Preencha esse campo.")
        validNome = false;
    } else {
        validarSucesso(nome)
        validNome = true;
    }
}

function validarErro(input, message){
    const campo = input.parentElement;
    const small = campo.querySelector('small');

    small.innerText = message
    campo.className = 'campo error';
}

function validarSucesso(input){

    const campo = input.parentElement;

    campo.className = 'campo success'
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
