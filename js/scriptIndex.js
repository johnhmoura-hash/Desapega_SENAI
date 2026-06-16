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

    fetch('https://localhost:7132/objeto', {
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);
        

        const resposta = document.getElementById("grid-produtos");

        if (!resposta) {
            console.error("Elemento #info não existe no HTML");
            return;
        }

        resposta.innerHTML = "";

        for (let i = 0; i < data.length; i++) {

resposta.innerHTML += `
<div class="carde">
    <div class="imagem-produto">
        <a href="produto.html?id=${data[i].id}">
            <img src="${data[i].foto}" alt="Produto">
        </a>
    </div>

    <div class="infos">
        <h3>${data[i].nome}</h3>
        <span>${data[i].tempo_uso}</span>
    </div>
</div>
`;
            console.log(document.getElementById("grid-produtos").innerHTML);;
        }
    });
});

