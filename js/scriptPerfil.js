
document.addEventListener("DOMContentLoaded", function () {

    fetch('https://localhost:7132/objeto/perfil', {
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {

        const resposta = document.getElementById("grid-produtos");

        if (!resposta) {
            console.error("Elemento #info não existe no HTML");
            return;
        }

        resposta.innerHTML = "";

        for (let i = 0; i < data.objetos.length; i++) {

            resposta.innerHTML += `
                <div class="carde">
                    <div class="imagem-produto">
                        <img src="${data.objetos[i].foto}" alt="Produto">
                    </div>
                    <div class="infos">
                        <h3>${data.objetos[i].nome}</h3>
                        <span>${data.objetos[i].tempo_uso}</span>
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

         const resposta2 = document.getElementById("lin");
        if (!resposta2) {
            console.error("Elemento #info não existe no HTML");
            return;
        }

        resposta2.innerHTML = "";
        
            resposta2.innerHTML += `
                <h2>${data.nome}</h2>
                <i class="ri-money-dollar-circle-line"></i><a>${data.pontos},0</a>

            `;
            
    });
     fetch('https://localhost:7132/objeto/perfil', {
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {

         const resposta3= document.getElementById("seguidores");
        if (!resposta3) {
            console.error("Elemento #info não existe no HTML");
            return;
        }

        
        resposta3.innerHTML = "";
        
            resposta3.innerHTML += `
                
                Produtos cadastrados ${data.totalObjetos} 
                Trocados ${data.totalTrocas}
                      
            `;
            
    });
});


