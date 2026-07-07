const btnNotificacao = document.getElementById("btnNotificacao");
const popupNotificacao = document.getElementById("popupNotificacao");
const listaNotificacoes = document.getElementById("listaNotificacoes");
async function carregarNotificacoes() {

    const response = await fetch("https://localhost:7132/Trocas", {
        credentials: "include"
    });

    const trocas = await response.json();

    console.log("Trocas:", trocas);

    listaNotificacoes.innerHTML = "";

    trocas.forEach(troca => {

        console.log("Troca:", troca);

        listaNotificacoes.innerHTML += `
            <div class="notificacao-item"
              onclick="window.location.href='aceitartrocas.html?id=${troca.id}'">

                <strong>${troca.nomeRemetente}</strong>
                quer trocar o produto
                <strong>${troca.produtoOferecido}</strong>

            </div>
        `;

    });

}

btnNotificacao.addEventListener("click", function(e){

    e.preventDefault();

    popupNotificacao.classList.toggle("ativo");

    if(popupNotificacao.classList.contains("ativo")){
        carregarNotificacoes();
    }

});

document.addEventListener("click", function(e){

    if(
        !btnNotificacao.contains(e.target) &&
        !popupNotificacao.contains(e.target)
    ){

        popupNotificacao.classList.remove("ativo");

    }

});