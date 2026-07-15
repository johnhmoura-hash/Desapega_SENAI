function abrirPerfil(idUsuario){
    window.location.href = `perfilpessoas.html?id=${idUsuario}`;
}


document.addEventListener("DOMContentLoaded", function () {

fetch('https://localhost:7132/objeto/ranking', {
    credentials: "include"
})
.then(response => response.json())
.then(data => {

    console.log(data);

    const resposta = document.getElementById("ranking");

    resposta.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        resposta.innerHTML += `
        
        <div class="ranking-item ranking-gold">

            <span class="ranking-position">
                #${i+1}
            </span>

            <span class="ranking-name">
                ${data[i].nome}
            </span>

            <span class="ranking-value">
                ${data[i].totalObjetos}
            </span>

            <span class="ranking-value">
                ${data[i].totalTrocas}
            </span>

            <button class="ranking-btn"
                onclick="abrirPerfil(${data[i].matricula})">
                <i class="ri-user-line"></i> Perfil
            </button>

        </div>

        `;
    }

});

});