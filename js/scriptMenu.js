document.addEventListener("DOMContentLoaded", function () {

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



    const inputPesquisa = document.getElementById("pesquisar");

    if (!inputPesquisa) return;

    inputPesquisa.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const texto = this.value.trim();

            if (texto === "") return;

            window.location.href = `tela_categoria.html?pesquisa=${encodeURIComponent(texto)}`;
        }

    });

    async function carregarIndicadorChat() {

        const response = await fetch(
            "https://localhost:7132/mensagem/naolidas",
            {
                credentials: "include"
            }
        );

        const dados = await response.json();

        const badge = document.getElementById("badgeChat");

        if (!badge) return;

        if (dados.qtddMensagens > 0) {
            badge.style.display = "flex";
            badge.textContent = dados.qtddMensagens;
        } else {
            badge.style.display = "none";
        }
    }
    carregarIndicadorChat();

    setInterval(carregarIndicadorChat, 3000);

    async function carregarIndicadorNotificacao() {

        const response = await fetch(
            "https://localhost:7132/notificacao/naolidas",
            {
                credentials: "include"
            });

        const dados = await response.json();

        

        const badge = document.getElementById("badgeNotificacao");

        if (!badge) return;

        if (dados.quantidade > 0) {
            badge.style.display = "flex";
            badge.textContent = dados.quantidade;
        } else {
            badge.style.display = "none";
        }
    }
    carregarIndicadorNotificacao();
    setInterval(carregarIndicadorNotificacao, 3000);

});