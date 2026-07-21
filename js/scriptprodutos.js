
function abrirPerfil(idUsuario) {
    window.location.href = `perfilpessoas.html?id=${idUsuario}`;
}
async function abrirTroca(idProdutoDesejado) {

    const resposta = await fetch(
        "https://localhost:7132/Objeto/perfil",
        { credentials: "include" }
    );

    const meusProdutos = await resposta.json();

    if (!meusProdutos.objetos || meusProdutos.objetos.length === 0) {
        document.getElementById("popup-sem-produto").style.display = "flex";
        return;
    }

    const overlay = document.getElementById("overlayTroca");
    const modal = document.querySelector(".modal-troca");

    modal.innerHTML = `
        <iframe
            src="trocas.html?id=${idProdutoDesejado}"
            width="100%"
            height="300"
            frameborder="0">
        </iframe>
    `;

    overlay.style.display = "flex";
} 

document.addEventListener("DOMContentLoaded", function () {

    const id = new URLSearchParams(window.location.search).get("id");

    fetch(`https://localhost:7132/Objeto/perfil/${id}`, {
        credentials: "include"
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);
            console.log("id_usuario:", data.id_usuario);

            const resposta = document.getElementById("pagina-produto");

            if (!resposta) {
                console.error("Elemento pagina-produto não existe");
                return;
            }

            console.log(data.foto_usuario);
            console.log(data);

            resposta.innerHTML = `
            <div class="produto-topo-area">

                <div class="produto-imagem-box">
                    <img src="${data.foto}">
                </div>

                <div class="produto-card-lateral">

                    <h3 class="produto-imagem-foto">${data.objetos}</h3>

<div class="produto-usuario-area">

    <div class="produto-usuario-foto">
        <img src="${data.foto_usuario}">
    </div>

    <div class="produto-usuario-info">

        <span class="produto-usuario-nome">
            ${data.usuarios}
        </span>

        <button class="btn-ver-perfil"
            onclick="abrirPerfil(${data.usuarioDestino})">
            <i class="">Perfil</i>
        </button>

    </div>

</div>

                    <button class="produto-botao-principal"
                        onclick="abrirTroca(${data.id})">
                        Eu quero
                    </button>

                    <button class="produto-botao-chat">
                        Chat <i class="ri-chat-3-line"></i>
                    </button>

                </div>

            </div>

            <div class="produto-inferior-area">

                <div class="produto-descricao-box">
                    <h3>Descrição</h3>
                    <p>${data.descricao}</p>
                </div>

                <div class="produto-info-box">

                    <h3>Informações</h3>

                    <div class="produto-info-grid">

                        <div>
                            <small>tempo</small>
                            <strong>${data.tempo_uso}</strong>
                        </div>

                        <div>
                            <small>categoria</small>
                            <strong>${data.categoria}</strong>
                        </div>

                        <div>
                            <small>trocas</small>
                            <strong>${data.prefere_troca}</strong>
                        </div>

                    </div>

                </div>

            </div>
        `;
        })
        .catch(error => {
            console.error("Erro no fetch:", error);
        });

});