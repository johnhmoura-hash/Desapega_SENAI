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
if(imgSlider.length > 0 && btnNav.length > 0){
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






const botao = document.getElementById("btnSelecionar");
const btnPontos = document.getElementById("btnPontos");
const btnQuero = document.getElementById("btnQuero");
const overlay = document.getElementById("overlayTroca");
const cancelar = document.getElementById("cancelarTroca");
const enviar = document.getElementById("enviarTroca");

let itemSelecionado = null;
if(btnQuero){
// abrir
btnQuero.onclick = () => {
  overlay.style.display = "flex";
};

// fechar
cancelar.onclick = () => {
  overlay.style.display = "none";
};

// selecionar item
document.querySelectorAll(".item").forEach(item => {
  item.onclick = () => {
    document.querySelectorAll(".item").forEach(i => i.classList.remove("selecionado"));
    item.classList.add("selecionado");
    itemSelecionado = item.dataset.id;
  };
});

// enviar proposta
enviar.onclick = () => {
  if(!itemSelecionado){
    alert("Proposta de troca enviada!");
    window.location.href = "estojo.html";
    return;
  } else{

  alert("Proposta enviada com item ID: " + itemSelecionado);
  overlay.style.display = "none";
}
};
botao.onclick = () => {
  botao.classList.toggle("selecionado");
}
}




       