const API = "https://localhost:7132";

async function carregarHistorico() {

    try {

        const respostaUsuario = await fetch(`${API}/Usuario`, {
            credentials: "include"
        });

        if (!respostaUsuario.ok) {
            alert("Usuário não autenticado.");
            return;
        }

        const usuario = await respostaUsuario.json();
        const matricula = Number(usuario.matricula);

        const respostaHistorico = await fetch(`${API}/Trocas/historico`, {
            credentials: "include"
        });

        if (!respostaHistorico.ok) {
            alert("Erro ao carregar histórico.");
            return;
        }

        const historico = await respostaHistorico.json();

        const container = document.querySelector(".historicor");
        container.innerHTML = "";

        historico.forEach(troca => {

            let meuProduto;
            let minhaFoto;

            let produtoRecebido;
            let fotoRecebida;

            let outraPessoa;

            if (troca.fk_usuarios_remetente == matricula) {

                meuProduto = troca.produtoRemetente;
                minhaFoto = `${API}/uploads/${troca.fotoRemetente}`;

                outraPessoa = troca.nomeDestinatario;

                if (troca.pontos_proposto) {
                    produtoRecebido = "2 Pontos";
                    fotoRecebida = "Img/pontos.png";
                } else {
                    produtoRecebido = troca.produtoDestinatario;
                    fotoRecebida = `${API}/uploads/${troca.fotoDestinatario}`;
                }

            } else {

                meuProduto = troca.pontos_proposto
                    ? "2 Pontos"
                    : troca.produtoDestinatario;

                minhaFoto = troca.pontos_proposto
                    ? "Img/pontos.png"
                    : `${API}/uploads/${troca.fotoDestinatario}`;

                produtoRecebido = troca.produtoRemetente;
                fotoRecebida = `${API}/uploads/${troca.fotoRemetente}`;

                outraPessoa = troca.nomeRemetente;
            }

            const tipo = troca.pontos_proposto
                ? `<span class="pontors">Troca por Pontos</span>`
                : `<span class="trocar">Troca de Produtos</span>`;

            container.innerHTML += `
                <div class="card-historicor">

                    <div class="produtors">

                        <div class="produtor">
                            <img src="${minhaFoto}">
                            <h3>${meuProduto}</h3>
                            <span>Seu produto</span>
                        </div>

                        <img src="Img/possivel logo.png" class="logo">

                        <div class="produtor">
                            <img src="${fotoRecebida}">
                            <h3>${produtoRecebido}</h3>
                            <span>Produto recebido</span>
                        </div>

                    </div>

                    <div class="infors">

                        <p><strong>Recebido por:</strong> ${outraPessoa}</p>

                        <p><strong>Tipo:</strong> ${tipo}</p>

                        <p><strong>Data:</strong> ${troca.data}</p>

                        <span class="staturs concluidor">
                            ${troca.status}
                        </span>

                    </div>

                </div>
            `;
        });

    } catch (erro) {

        console.error(erro);

    }

}

carregarHistorico();