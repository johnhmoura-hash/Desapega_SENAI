function abrirPerfil(idUsuario){
    window.location.href = `perfilpessoas.html?id=${idUsuario}`;
}


document.addEventListener("DOMContentLoaded", function () {

    fetch('https://localhost:7132/objeto/ranking', {
        credentials: "include"
    })
        .then(response => response.json())
        .then(data => {

            const resposta = document.getElementById("ranking");
            if (!resposta) {
                console.error("Elemento #info não existe no HTML");
                return;
            }


            resposta.innerHTML = "";
for (let i = 0; i < data.length; i++) {

    let classeRanking = "ranking-blue";

    if (i === 0) {
        classeRanking = "ranking-gold";
    } else if (i === 1) {
        classeRanking = "ranking-silver";
    } else if (i === 2) {
        classeRanking = "ranking-bronze";
    }

    resposta.innerHTML += `
        <div class="ranking-item ${classeRanking}">
            <span class="ranking-position">#${i + 1}</span>
            <span class="ranking-name">${data[i].nome}</span>
            <span class="ranking-value">${data[i].totalObjetos}</span>
            <span class="ranking-value">${data[i].totalTrocas}</span>
            <button class="ranking-btn"
    onclick="abrirPerfil(${data[i].usuarioDestino})">
    Perfil
</button>
        </div>
    `;
}





        });
})
