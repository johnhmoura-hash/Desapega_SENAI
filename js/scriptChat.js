document.addEventListener("DOMContentLoaded", function () {

    fetch("https://localhost:7132/mensagem/conversas", {
        credentials: "include"
    })
        .then(response => {
            console.log(response.status);

            if (!response.ok) {
                throw new Error("Erro: " + response.status);
            }

            return response.json();
        })
        .then(data => {
            console.log(data);

            const api = "https://localhost:7132/uploads";
            console.log(api)
            const resposta = document.getElementById("sidebar");

            if (!resposta) {
                console.error("Elemento #info não existe no HTML");
                return;
            }
            resposta.innerHTML += ""
            for (let i = 0; i < data.length; i++) {
                resposta.innerHTML += `
            
            <h2>Chat</h2>

        <div class="contact">
            <div class="avatar">
            <img src="${api}/${data[i].foto}" class="fotoPerfil">
            </div>

            <div>
                <strong>${data[i].nome}</strong><br>
                <small>${data[i].ultimaMensagem}</small>
            </div>
        </div>

        <div class="contact-search">
            <input type="text" placeholder="Buscar...">
        </div>

            `
            }

        })
        .catch(err => {
            console.error(err);
        });
})