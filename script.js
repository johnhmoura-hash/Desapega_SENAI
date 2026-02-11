function validarFormulario() {
    var nome = document.getElementById('usuario').value;
    var senha = document.getElementById('senha').value;
    var numMatrícula = document.getElementById('numMatrícula').value;
    var numTelefone = document.getElementById('numTelefone').value;
    var email = document.getElementById('email').value;
    var emailConfirmar = document.getElementById('emailConfirmar').value;
    var confirmarSenha = document.getElementById('confirmarSenha').value;
    if (nome.trim()=="" || senha.trim()=="" || numMatrícula.trim()=="" || numTelefone.trim()=="" || email.trim()=="" || emailConfirmar.trim()=="" ||confirmarSenha.trim()==""   ) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }
    if (email != emailConfirmar && senha != confirmarSenha){
        alert('');
        return false
    }

    return true;
}

/* slider */

let imgSlider = document.querySelectorAll('.slider-container .slider-box');
let btnNav = document.querySelectorAll('.btn-nav-box .btn-nav');

let contadorImg = imgSlider.length;
let imgAtiva = 0;

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

