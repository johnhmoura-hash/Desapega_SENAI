document.addEventListener("DOMContentLoaded", function () {

     const id = new URLSearchParams(window.location.search).get("id");

    console.log("ID:", id);

fetch(`https://localhost:7132/Objeto/perfil/${id}` ,{
 credentials: "include"})
.then(response => response.json())
.then(data => {

       console.log(data);

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
.then(produtos => {

    if(produtos.length > 0){

        let primeiro = produtos[0];

        document.getElementById("nomeUsuario").textContent = primeiro.usuarios;
        document.getElementById("fotoProduto").src = primeiro.foto;
        document.getElementById("nomeProduto").textContent = primeiro.objetos;
        document.getElementById("tempoProduto").textContent = primeiro.tempo_uso;
    }

});




fetch("https://localhost:7132/Objeto/perfil",{
    credentials:"include"
})
.then(response => response.json())
.then(produtos => {

    let select = document.getElementById("meusProdutos");

    produtos.forEach(produto => {

        select.innerHTML += `
            <option value="${produto.objetos}">
                ${produto.objetos}
            </option>
        `;
    });
select.addEventListener("change", function () {

    console.log("Selecionado:", this.value);

    let produtoSelecionado =
        produtos.find(p => p.objetos === this.value);

    if(produtoSelecionado){

        document.getElementById("nomeUsuario").textContent =
            produtoSelecionado.usuarios;

        document.getElementById("fotoProduto").src =
            produtoSelecionado.foto;

        document.getElementById("nomeProduto").textContent =
            produtoSelecionado.objetos;

        document.getElementById("tempoProduto").textContent =
            produtoSelecionado.tempo_uso;
    }
});

});


});

