document.addEventListener("DOMContentLoaded", function () {

fetch("https://localhost:7132/Objeto/perfil",{
    Credentials: "include"})
    .then(response => response.json())
    .then(data => {

        const resposta = document.getElementById("pagina-produto");

        if (!resposta) {
            console.error("Elemento pagina-produto não existe");
            return;
        }

        resposta.innerHTML = "";

        for (let i = 0; i < data.length; i++) {

            resposta.innerHTML += `
                <div class="produto-topo-area">

                    <div class="produto-imagem-box">
                        <img src="${data[i].Foto}">
                    </div>

                    <div class="produto-card-lateral">

                        <h2 class="produto-titulo">${data[i].Objeto}</h2>

                        <div class="produto-usuario-area">

                            <div class="produto-usuario-foto">
                                <img src="">
                            </div>

                            <span class="produto-usuario-nome">
                                <p>${data[i].Usuario}</p>
                            </span>

                            <button class="produto-botao-seguir">seguir</button>
                        </div>

                        <div class="produto-divisor"></div>

                        <button class="produto-botao-principal">Eu quero</button>

                        <button class="produto-botao-chat">
                            Chat <i class="ri-chat-3-line"></i>
                        </button>

                    </div>
                </div>

                <div class="produto-inferior-area">

                    <div class="produto-descricao-box">
                        <h3>Descrição</h3>
                        <p>${data[i].Descricao}</p>
                    </div>

                    <div class="produto-info-box">

                        <h3>Informações</h3>

                        <div class="produto-info-grid">

                            <div>
                                <small>tempo</small>
                                <strong>${data[i].Tempo_uso}</strong>
                            </div>

                            <div>
                                <small>categoria</small>
                                <strong>${data[i].Categoria}</strong>
                            </div>

                            <div>
                                <small>trocas</small>
                                <strong>${data[i].Prefere_troca}</strong>
                            </div>

                        </div>

                    </div>

                </div>
            `;
        }

    })
    .catch(error => {
        console.error("Erro no fetch:", error);
    });
})





/*
const btnQuero = document.getElementById("btnQuero");

btnQuero.addEventListener("click", async () => {

    const troca = {
        Fk_objetos_remetente: Number(btnQuero.dataset.objetoRemetente),
        Fk_objetos_destinatario: Number(btnQuero.dataset.objetoDestinatario),
        Fk_usuarios_destinatario: Number(btnQuero.dataset.usuarioDestinatario)
    };

    try {

        const resposta = await fetch(
            "https://localhost:7132/Trocas",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(troca)
            }
        );

        const resultado = await resposta.text();

        if (resposta.ok) {
            alert("Troca solicitada com sucesso!");
        } else {
            alert(resultado);
        }

    } catch (erro) {
        console.error(erro);
        alert("Erro ao solicitar troca.");
    }

});


const myForm = document.getElementById('Trocar');
myForm.addEventListener('submit', function (event) {
   
    event.preventDefault();
       fetch('http://localhost:7132/pessoa', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value,
        }),
    }).
        then(response => response.json())
            .then(data => {
            console.log("Sucesso:", data);
            alert("Conta criada com sucesso!");
            formProduto.reset();
            limparBordas();
    })
});

*/


