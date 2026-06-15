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
    });

    fetch('https://localhost:7132/objeto/perfil', {
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);
         const resposta2 = document.getElementById("lin");
        if (!resposta2) {
            console.error("Elemento #info não existe no HTML");
            return;
        }

        resposta2.innerHTML = "";
        
            resposta2.innerHTML += `
                <h2>${data[0].usuarios}</h2>
                <i class="ri-money-dollar-circle-line"></i><a>${data[0].pontos},0</a>

            `;
            
    });
     fetch('https://localhost:7132/objeto/perfil', {
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);
         const resposta3= document.getElementById("seguidores");
        if (!resposta3) {
            console.error("Elemento #info não existe no HTML");
            return;
        }

        
        resposta3.innerHTML = "";
        
            resposta3.innerHTML += `
                
                Produtos cadastrados ${data[0].totalObjetos} 
                &nbsp;&nbsp;
                Trocados ${data[0].totalTrocas}
                
                

            `;
            
    });
});