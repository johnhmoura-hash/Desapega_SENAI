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


document.addEventListener("DOMContentLoaded", function () {
   
    fetch('https://localhost:7132/objeto',{ 
         credentials:"include"
        })

    .then(response =>
        response.json())
        .then(data => {
            console.log(data);
            if(data.length>0){
           var resposta = document.getElementById("gallery-container");
               

         for (let i = 0; i < data.length; i++) {

    resposta.innerHTML += "<h3>"+data[i].objetos +"</h3>";
    resposta.innerHTML += "<h3>" + data[i].descricao +"</h3>";
    resposta.innerHTML += "<h3>" + data[i].tempo_uso +"</h3>";
    resposta.innerHTML += `
    <img src="https://localhost:7132/wwwroot/uploads/${data[i].foto}" alt="Foto">
`;
    
         }}
        
        })
});