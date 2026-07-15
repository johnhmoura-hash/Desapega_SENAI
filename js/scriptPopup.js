const btnNotificacao = document.getElementById("btnNotificacao");
const popupNotificacao = document.getElementById("popupNotificacao");
const listaNotificacoes = document.getElementById("listaNotificacoes");

async function carregarNotificacoes() {

    try {
        const response = await fetch("https://localhost:7132/notificacao", {
            credentials: "include"
        });

        if (!response.ok)
            throw new Error("Erro ao buscar notificações.");

        const notificacoes = await response.json();

        listaNotificacoes.innerHTML = "";

        if (notificacoes.length === 0) {

            listaNotificacoes.innerHTML = `
                <div class="notificacao-vazia">
                    Nenhuma notificação.
                </div>
            `;

            return;
        }

        notificacoes.forEach(n => {
             console.log(n);

            const item = document.createElement("div");
            item.classList.add("item-notificacao");
            item.innerHTML = `
        
       <span> ${n.conteudo}</span>
         <button class="btnExcluir">
        <i class="ri-delete-bin-line"></i>
         </button>       
    `
    item.querySelector(".btnExcluir").addEventListener("click", async (e) => {

    e.stopPropagation();

    const resposta = await fetch(`https://localhost:7132/notificacao/${n.id}`,{
        method:"DELETE",
        credentials:"include"
    });

    if(resposta.ok){
        item.remove();
    }
});;

            if (n.status === "Não lida") {
                item.classList.add("nao-lida");
            }

            if (n.tipo === "NovaProposta") {

                item.style.cursor = "pointer";

                item.onclick = () => {
                    location.href = `aceitartrocas.html?idTroca=${n.fk_troca_id}`;
                };

            } else {

                item.style.cursor = "default";

            }

            listaNotificacoes.appendChild(item);

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