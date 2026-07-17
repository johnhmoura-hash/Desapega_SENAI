document.addEventListener("DOMContentLoaded", () => {


    const API_UPLOADS = `https://localhost:7132/uploads`;

    const sidebar = document.getElementById("sidebar2");
    const chat = document.getElementById("chat-body");
    const txtMensagem = document.getElementById("txtMensagem");
    const btnEnviar = document.getElementById("btnEnviar");

    const idUsuario = new URLSearchParams(window.location.search).get("id");

    carregarConversas();

    carregarConversas();

if (!idUsuario) {

    chat.innerHTML = `
        <div class="sem-chat">
            <i class="ri-chat-3-line"></i>

            <h2>Selecione uma conversa</h2>

            <p>Escolha uma conversa para começar.</p>
        </div>
    `;

    txtMensagem.style.display = "none";
    btnEnviar.style.display = "none";

} else {

    txtMensagem.style.display = "block";
    btnEnviar.style.display = "block";

    carregarMensagens();

    setInterval(carregarMensagens, 3000);

}


    if (idUsuario) {
        carregarMensagens();

        // Atualiza as mensagens a cada 3 segundos
        setInterval(carregarMensagens, 3000);
    }

    btnEnviar?.addEventListener("click", enviarMensagem);

    async function carregarConversas() {

        try {

            const response = await fetch(`https://localhost:7132/mensagem/conversas`, {
                credentials: "include"
            });

            if (!response.ok)
                throw new Error(response.status);

            const conversas = await response.json();

            console.log(conversas);
            console.log("Quantidade:", conversas.length);
            sidebar.innerHTML = "";

            if (conversas.length === 0) {

                sidebar.innerHTML = `
        <div class="sem-conversa">
            <h3>Nenhuma conversa encontrada</h3>
            <p>Quando você trocar mensagens com outro usuário, elas aparecerão aqui.</p>

            <a href="inicio.html" class="btn-novo">
                Procurar itens
            </a>
        </div>
    `;

                return;
            }

            conversas.forEach(c => {

                const foto = c.foto
                    ? `${API_UPLOADS}/${c.foto}`
                    : "Img/usuario.png";

                sidebar.innerHTML += `
                    <div class="contact"
                         onclick="location.href='teste-chat.html?id=${c.usuarioId}'">

                        <div class="avatar">
                            <img src="${foto}">
                        </div>

                        <div>
                            <strong>${c.nome}</strong><br>
                            <small>${c.ultimaMensagem}</small>
                        </div>

                    </div>
                `;

            });

        }
        catch (e) {

            console.error(e);

        }

    }

    async function carregarMensagens() {

        try {

            const response = await fetch(`https://localhost:7132/mensagem/${idUsuario}`, {
                credentials: "include"
            });

            if (!response.ok)
                throw new Error(response.status);

            const mensagens = await response.json();
            console.log(mensagens)
            chat.innerHTML = "";

            mensagens.forEach(m => {

                chat.innerHTML += `
                    <div class="message ${m.minhaMensagem ? "right" : "left"}">

                        <p>${m.conteudo}</p>

                       <small>${formatarData(m.data_hr)}</small>

                    </div>
                `;

            });

            chat.scrollTop = chat.scrollHeight;

        }
        catch (e) {

            console.error(e);

        }

    }

    async function enviarMensagem() {

        if (!txtMensagem.value.trim())
            return;

        try {

            const response = await fetch(`https://localhost:7132/mensagem`, {

                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    fk_usuarios_destinatario: Number(idUsuario),

                    conteudo: txtMensagem.value

                })

            });

            if (!response.ok)
                throw new Error(response.status);

            txtMensagem.value = "";

            carregarMensagens();

            carregarConversas();

        }
        catch (e) {

            console.error(e);

        }

    }
   function formatarData(data) {

    const d = new Date(data);
    const hoje = new Date();

    if (d.toDateString() === hoje.toDateString()) {
        return "Hoje";
    }

    return d.toLocaleDateString("pt-BR");
}

});