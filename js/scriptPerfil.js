document.addEventListener("DOMContentLoaded", function () {

    fetch('https://localhost:7132/objeto/perfil', {
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
                    <div class="infos">
                        <h3>${data[i].objetos}</h3>
                        <span>${data[i].tempo_uso}</span>
                    </div>
                </div>
            `;
        }

         const resposta2 = document.getElementById("lin");

        if (!resposta) {
            console.error("Elemento #info não existe no HTML");
            return;
        }

        resposta2.innerHTML = "";

        for (let i = 0; i < data.length; i++) {

            resposta.innerHTML += `
                <h2>"${data[i].usuarios} "</h2>
          <i class="ri-money-dollar-circle-line"></i><a>00,0</a>
            `;
        }
    });
});