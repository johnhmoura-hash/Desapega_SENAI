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