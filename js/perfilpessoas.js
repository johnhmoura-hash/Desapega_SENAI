document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const idUsuario = params.get("id");

    fetch(`https://localhost:7132/usuario/perfil/${idUsuario}`, {
        credentials: "include"
    })
    .then(res => {
        if (!res.ok)
            throw new Error("Erro ao carregar perfil");

        return res.json();
    })
    .then(data => {


console.log(data);
        
        document.getElementById("fotoPerfil").innerHTML = `
            <img src="${data.foto_usuario}">
        `;

        document.getElementById("lin").innerHTML = `
            <h2>${data.nome}</h2>
            <i class="ri-money-dollar-circle-line"></i>
            <a>${data.pontos},0</a>
        `;

        document.getElementById("seguidores").innerHTML = `
            Produtos cadastrados ${data.totalObjetos}
            Trocados ${data.totalTrocas}
        `;

        const grid = document.getElementById("grid-produtos");
        grid.innerHTML = "";

        data.objetos.forEach(produto => {

            if (produto.status_objeto) {

                grid.innerHTML += `
                    <a href="produto.html?id=${produto.id}" class="card-link">
                        <div class="carde">

                            <div class="imagem-produto">
                                <img src="${produto.foto}">
                            </div>

                            <div class="infos">
                                <h3>${produto.nome}</h3>
                                <span>${produto.tempo_uso}</span>
                            </div>

                        </div>
                    </a>
                `;

            }

        });

    })
    .catch(err => console.error(err));

});