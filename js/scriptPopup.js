const btnNotificacao = document.getElementById("btnNotificacao");
const popupNotificacao = document.getElementById("popupNotificacao");
const listaNotificacoes = document.getElementById("listaNotificacoes");

async function carregarNotificacoes() {

    try {

        const response = await fetch("https://localhost:7132/Trocas", {
            credentials: "include"
        });

        if (!response.ok)
            throw new Error("Erro ao buscar notificações.");

        const trocas = await response.json();

        console.log("Trocas recebidas:", trocas);

        listaNotificacoes.innerHTML = "";

        if (trocas.length === 0) {

            listaNotificacoes.innerHTML = `
                <div class="notificacao-vazia">
                    Nenhuma notificação.
                </div>
            `;

            return;
        }

        trocas.forEach(troca => {

            listaNotificacoes.innerHTML += `
                <div class="notificacao-item"
                     onclick="window.location.href='aceitartrocas.html?idTroca=${troca.id}'">

                    <strong>${troca.nomeRemetente}</strong>
                    quer trocar um produto
                    

                    <span class="tempo">${troca.data}</span>
                </div>
            `;
        });

    } catch (erro) {

        console.error(erro);

        listaNotificacoes.innerHTML = `
            <div class="notificacao-vazia">
                Erro ao carregar notificações.
            </div>
        `;
    }
}

btnNotificacao.addEventListener("click", function (e) {

    e.preventDefault();

    popupNotificacao.classList.toggle("ativo");

    if (popupNotificacao.classList.contains("ativo")) {
        carregarNotificacoes();
    }

});

document.addEventListener("click", function (e) {

    if (
        !btnNotificacao.contains(e.target) &&
        !popupNotificacao.contains(e.target)
    ) {

        popupNotificacao.classList.remove("ativo");
    }

});