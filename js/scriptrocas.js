document.addEventListener("DOMContentLoaded", function () {

let produtoSelecionado = null;
let usuarioDestino = 0;
let produtoDestino = 0;
let pontosPropostos = 0;
let usarPontos = false;

     const id = new URLSearchParams(window.location.search).get("id");

    console.log("ID:", id);

fetch(`https://localhost:7132/Objeto/perfil/${id}` ,{
 credentials: "include"})
.then(response => response.json())
.then(data => {

    console.log(data);

   usuarioDestino = data.usuarioDestino;
produtoDestino = data.id;

    document.getElementById("produto-desejado").innerHTML = `
            
           <div class="usuario">
            <img src="" class="foto-perfil">
            <span>${data.usuarios}</span>
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

fetch("https://localhost:7132/Objeto/perfil",{
    credentials:"include"
})
.then(response => response.json())
.then(dados => {

    if (dados.objetos.length > 0) {

        let primeiro = dados.objetos[0];

        document.getElementById("nomeUsuario").textContent = dados.nome;
        document.getElementById("fotoProduto").src = primeiro.foto;
    }

});



fetch("https://localhost:7132/Objeto/perfil",{
    credentials:"include"
})
.then(response => response.json())
.then(dados => {

    console.log(dados);
console.log(dados.objetos);

    let select = document.getElementById("meusProdutos");


    
 dados.objetos.forEach(produto => {

    select.innerHTML += `
        <option value="${produto.nome}">
            ${produto.nome}
        </option>
    `;
});
select.addEventListener("change", function () {

    console.log("Selecionado:", this.value);

produtoSelecionado =
    dados.objetos.find(p => p.nome === this.value);

    if(produtoSelecionado){

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

    console.log({
    usuarioDestino,
    produtoRemetente: produtoSelecionado.id,
    produtoDestino,
    pontosPropostos
});

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

            pontos_proposto: pontosPropostos,

             status: "Pendente"

        })

    })

 .then(async response => {

    console.log("Status:", response.status);

    const texto = await response.text();
    console.log("Resposta:", texto);

    if (!response.ok)
        throw new Error(texto);

    return texto;

})

    .then(data => {

        console.log(data);

        alert("Troca enviada com sucesso!");

    })

  .catch(error => {

    console.error("Erro:", error);

    alert(error.message);

});

});




const btnPontos = document.getElementById("btnPontos");

btnPontos.addEventListener("click", () => {

    usarPontos = !usarPontos;

    btnPontos.classList.toggle("selecionado");

    pontosPropostos = usarPontos ? 2 : 0;
 console.log(pontosPropostos);
});


});

