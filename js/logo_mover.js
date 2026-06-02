// PEGAR A LOGO
const logo = document.getElementById("logo");

// MOVIMENTO AUTOMÁTICO
let posicao = 0;
let direcao = 1;

setInterval(() => {

    posicao += direcao;

    logo.style.transform = `translateY(${posicao}px)`;

    // LIMITE
    if(posicao >= 15){
        direcao = -1;
    }

    if(posicao <= 0){
        direcao = 1;
    }

}, 50);


// EFEITO AO PASSAR O MOUSE
logo.addEventListener("mouseenter", () => {

    logo.style.transform = "scale(1.1) rotate(5deg)";

});

// VOLTAR AO NORMAL
logo.addEventListener("mouseleave", () => {

    logo.style.transform = `translateY(${posicao}px)`;

});
