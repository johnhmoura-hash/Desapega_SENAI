document.addEventListener("DOMContentLoaded", function () {
  fetch('https://localhost:7132/objeto/perfil', {
        credentials: "include"
    })

    var id = HttpContext.Session.GetString("Idusado");
    console.log(id);

    fetch(`https://localhost:7132/usuario/atualizar`, {
         method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {


        const resposta = document.getElementById("formEditar");

        if (!resposta) {
            console.error("Elemento #info não existe no HTML");
            return;
        }

        resposta.innerHTML = "";

        for (let i = 0; i < data.length; i++) {

            resposta.innerHTML += `
            <div class="grupo">
              <label>Nome</label>
              <input type="text" value="${data.nome}">
            </div>

            <div class="grupo">
                <label>E-mail</label>
           <input type="email" value="${data.email}">
            </div>

            <div class="grupo">
                <label>Telefone</label>
                <input type="text" value="${data.telefone}">
            </div>

            <div class="camp">
                <button class="btn-salvar">
                      Salvar Alterações
                </button>   
            </div>
            `;
            ;
        }
    });
});