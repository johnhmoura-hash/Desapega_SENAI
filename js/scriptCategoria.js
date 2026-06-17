document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria");

    if (!categoria) {
        console.error("Categoria não informada.");
        return;
    }

    document.getElementById("titulo-categoria").textContent = categoria;

    fetch(`https://localhost:7132/objeto/categoria/${encodeURIComponent(categoria)}`, {
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {

        produtos = data;

        mostrarProdutos(produtos);
    
        
    })
    .catch(error => console.error(error));

});

function mostrarProdutos(lista){

   const grid = document.getElementById("grid-produtos");
        grid.innerHTML = "";

        lista.forEach(produto => {
            grid.innerHTML += `
                <div class="carde">
                    <div class="imagem-produto">
                        <a href="produto.html?id=${produto.id}">
                            <img src="${produto.foto}" alt="${produto.nome}">
                        </a>
                    </div>

                    <div class="infos">
                        <h3>${produto.nome}</h3>
                        <span>${produto.tempo_uso}</span>
                    </div>
                </div>
            `;
         });
}

document.getElementById("filtroTempo").addEventListener("change", function () {

    const filtro = this.value;

    if (filtro === "Todos") {
        mostrarProdutos(produtos);
        return;
    }

   const filtrados = produtos.filter(produto => {

    const tempo = produto.tempo_uso;

    if (filtro === "6 meses +") {

        const meses = parseInt(tempo);

        return tempo.includes("mes") && meses >= 6;
    } else  

    if (filtro === "1 ano +") {
        return tempo.includes("ano");
    }

    return tempo === filtro;

});

    mostrarProdutos(filtrados);

});