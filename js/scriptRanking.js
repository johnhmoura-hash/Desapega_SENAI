document.addEventListener("DOMContentLoaded", function () {

fetch('https://localhost:7132/objeto/ranking', {
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {

         const resposta= document.getElementById("ranking");
        if (!resposta) {
            console.error("Elemento #info não existe no HTML");
            return;
        }

        
        resposta.innerHTML = "";
        
         for (let i = 0; i < data.length; i++) {
            
            resposta.innerHTML += `
                
            <div class="ranking-item ranking-gold">
            <span class="ranking-position">#${[i+1]}</span>
            <span class="ranking-name">${data[i].nome}</span>
            <span class="ranking-value">${data[i].totalObjetos}</span>
            <span class="ranking-value">${data[i].totalTrocas}</span>
            <button class="ranking-btn">Perfil</button>
            </div>

                      
            `;
         }

            
    });
})