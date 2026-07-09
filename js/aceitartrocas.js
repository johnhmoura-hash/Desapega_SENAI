document.addEventListener("DOMContentLoaded", function () {

    const idTroca = new URLSearchParams(window.location.search).get("idTroca");

    console.log("ID da troca:", idTroca);

    fetch(`https://localhost:7132/Trocas/${idTroca}`, {
        credentials: "include"
    })
    .then(r => r.json())
    .then(data => {

        console.log(data);

        const api = "https://localhost:7132/uploads";
        const fotoPadrao = "Img/usuario.png";

        document.getElementById("produto-desejado").innerHTML = `
            <div class="usuario">
                <img src="${data.fotoPerfilRemetente ? `${api}/${data.fotoPerfilRemetente}` : fotoPadrao}"
                     class="foto-perfil">
                <span>${data.remetente}</span>
            </div>

            <div class="cardr">
                <div class="imagem">
                    <img src="${api}/${data.fotoRemetente}">
                </div>

                <div class="infos">
                    <h3>${data.produtoRemetente}</h3>
                    <span>${data.tempoRemetente}</span>
                </div>
            </div>
        `;

        document.getElementById("fotoPerfilDestinatario").src =
            data.fotoPerfilDestinatario
                ? `${api}/${data.fotoPerfilDestinatario}`
                : fotoPadrao;

        document.getElementById("nomeUsuario").textContent =
            data.destinatario;

        document.getElementById("fotoProduto").src =
            `${api}/${data.fotoDestinatario}`;

        document.getElementById("nomeProduto").textContent =
            data.produtoDestinatario;

        document.getElementById("tempoProduto").textContent =
            data.tempoDestinatario;

        const btnPontos = document.getElementById("btnPontos");

        btnPontos.style.display =
            data.pontos_proposto == true ? "block" : "none";
    })
    .catch(err => {
        console.error(err);
    });


    document.getElementById("btn-cancelar").addEventListener("click",recusarTroca);
       
    function recusarTroca(){

        fetch(`https://localhost:7132/Trocas/${idTroca}`, { 
        method: 'PUT',
        credentials: 'include',
         headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status:"Recusada"
        })
    
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao excluir a proposta.");
        }

        alert("Proposta recusada com sucesso!");
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error(error);
        alert("Não foi possível excluir a proposta.");
    });
    }
    
    document.getElementById("btnAceitar").addEventListener("click",aceitarTroca);
       
    function aceitarTroca(){

        fetch(`https://localhost:7132/Trocas/${idTroca}`, { 
        method: 'PUT',
        credentials: 'include',
         headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status:"Aceita"
        })
       
    }).then(response => {
        if (!response.ok) {
            throw new Error("Erro ao aceitar a proposta.");
        }

        alert("Proposta aceita com sucesso!");
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error(error);
        alert("Não foi possível aceitar a proposta.");
    });
    } 

});