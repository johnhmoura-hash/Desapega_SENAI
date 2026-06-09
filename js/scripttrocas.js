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