const menu = document.getElementById("menu");

async function carregarMenu() {

    const resposta = await fetch("https://localhost:7132/usuario/logado", {
        credentials: "include"
    });

    if (resposta.ok) {

        menu.innerHTML = `
            <a href="index.html">Início</a>
            <a href="cadastroObjeto.html">Cadastrar Produto</a>
            <a href="perfil.html">Perfil</a>
            <a href="#" id="btnNotificacao">
                Notificações <i class="ri-notification-line"></i>
            </a>
            <a href="logout.html">Sair</a>
        `;

    } else {

        menu.innerHTML = `
            <a href="index.html">Início</a>
            <a href="login.html">Entrar</a>
            <a href="cadastro.html">Cadastrar</a>
        `;

    }

}

carregarMenu();