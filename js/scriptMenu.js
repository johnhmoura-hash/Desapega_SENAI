const menu = document.getElementById("menu");

async function carregarMenu() {

    const resposta = await fetch("https://localhost:7132/usuario", {
        credentials: "include"
    });

    if (!resposta.ok) {

        menu.innerHTML = `

            <a href="Tela_login.html">Entrar</a>
            <a href="Tela_cadastrar.html">Cadastrar</a>
            
        
        `;

    }

}

carregarMenu();

document.addEventListener("DOMContentLoaded", function () {

    const inputPesquisa = document.getElementById("pesquisar");

    if (!inputPesquisa) return;

    inputPesquisa.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const texto = this.value.trim();

            if (texto === "") return;

            window.location.href = `tela_categoria.html?pesquisa=${encodeURIComponent(texto)}`;
        }

    });

});