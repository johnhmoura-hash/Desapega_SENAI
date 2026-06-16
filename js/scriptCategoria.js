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

        console.log(data);

        const grid = document.getElementById("grid-produtos");
        grid.innerHTML = "";

        data.forEach(produto => {
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
    })
    .catch(error => console.error(error));

});
