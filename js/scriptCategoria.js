document.addEventListener("DOMContentLoaded", function (){
 
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria");

    console.log(categoria);

   fetch(`https://localhost:7132/objeto/categoria/${categoria}`, {
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        const grid = document.getElementById("grid-produtos");

        if (!grid) {
            console.error("Elemento #info não existe no HTML");
            return;
        }

    

    grid.innerHTML = "";

     for (let i = 0; i < data.length; i++) {

        grid.innerHTML += `
            <div class="carde">
                <div class="imagem-produto">
                    <a href="produto.html?id=${data[i].id}">
                        <img src="${data[i].foto}" alt="Produto">
                    </a>
                </div>

                <div class="infos">
                    <h3>${data[i].nome}</h3>
                    <span>${data[i].tempo_uso}</span>
                </div>
            </div>
            `};
    });
});
