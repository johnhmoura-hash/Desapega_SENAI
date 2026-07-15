function abrirPerfil(idUsuario){
    window.location.href = `perfilpessoas.html?id=${idUsuario}`;
}

document.addEventListener("DOMContentLoaded", function () {

    let produtoSelecionado = null;
    let usuarioDestino = 0;
    let produtoDestino = 0;
    let usarPontos = false;

    const id = new URLSearchParams(window.location.search).get("id");

    fetch(`https://localhost:7132/Objeto/perfil/${id}`, {
        credentials: "include"
    })
        .then(response => response.json())
        .then(data => {


            usuarioDestino = data.usuarioDestino;
            produtoDestino = data.id;

            document.getElementById("produto-desejado").innerHTML = `
            
  <div class="usuario">

    <img src="${data.foto_usuario}" class="foto-perfil">

    <p class="nome-usuario">
        ${data.usuarios}
    </p>

    <button class="btn-ver-perfil"
        onclick="abrirPerfil(${data.usuarioDestino})">
        <i class="ri-user-line">Perfil</i>
    </button>

</div>

        <div class="cardr">
            <div class="imagem">
                <img src="${data.foto}">
            </div>

            <div class="infos">
                <h3>${data.objetos}</h3>
                <span>${data.tempo_uso}</span>
            </div>
        </div>

            </div>

    `;
        });

    fetch("https://localhost:7132/Objeto/perfil", {
        credentials: "include"
    })
        .then(response => response.json())
        .then(dados => {
            if (dados.objetos.length > 0) {

                let primeiro = dados.objetos[0];

                document.getElementById("nomeUsuario").textContent = dados.nome;
                document.getElementById("fotoProduto").src = primeiro.foto;
                document.getElementById("minhaFoto").src = `https://localhost:7132/uploads/${dados.foto_usuario}`;
            }

        });



    fetch("https://localhost:7132/Objeto/perfil", {
        credentials: "include"
    })
        .then(response => response.json())
        .then(dados => {

            let select = document.getElementById("meusProdutos");

            dados.objetos.forEach(produto => {

                select.innerHTML += `
            <option value="${produto.id}">
                ${produto.nome}
            </option>
        `;
            });

            select.addEventListener("change", function () {

                produtoSelecionado =
                    dados.objetos.find(p => p.id == this.value);

                if (produtoSelecionado) {

                    document.getElementById("nomeUsuario").textContent =
                        dados.nome;

                    document.getElementById("fotoProduto").src =
                        produtoSelecionado.foto;
                }
            });

        });



    const btnTrocar = document.querySelector(".btn-quero");
    btnTrocar.addEventListener("click", function () {

        if (!produtoSelecionado) {
            alert("Selecione um produto.");
            return;
        }

        fetch("https://localhost:7132/Trocas", {

            method: "POST",

            credentials: "include",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                fk_usuarios_destinatario: usuarioDestino,

                fk_objetos_remetente: produtoSelecionado.id,

                fk_objetos_destinatario: produtoDestino,

                pontos_proposto: usarPontos,

                status: "Pendente"

            })

        })
    

        .then(async response => {

            const texto = await response.text();

            if (!response.ok)
                throw new Error(texto);

            return texto;

        })

        .then(data => {

            alert("Troca enviada com sucesso!");

        })
        })

    const btnPontos = document.getElementById("btnPontos");

    btnPontos.addEventListener("click", () => {

        usarPontos = !usarPontos;

        btnPontos.classList.toggle("selecionado");


    });


});





