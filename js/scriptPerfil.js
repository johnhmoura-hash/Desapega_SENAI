document.addEventListener("DOMContentLoaded", function () {

    fetch('https://localhost:7132/objeto/login', {
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        const resposta = document.getElementById("grid-produtos");

        if (!resposta) {
            console.error("Elemento #info não existe no HTML");
            return;
        }

        resposta.innerHTML = "";

        for (let i = 0; i < data.length; i++) {

            resposta.innerHTML += `
                <div class="carde">
                    <div class="imagem-produto">
                        <img src="${data[i].foto}" alt="Produto">
                    </div>
                    <div class="info">
                        <h3>${data[i].nome}</h3>
                        <span>${data[i].tempo_uso}</span>
                    </div>
                </div>
            `;
        }
    });
});