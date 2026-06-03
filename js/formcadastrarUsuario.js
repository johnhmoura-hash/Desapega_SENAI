const myForm = document.getElementById('cadastrar');

myForm.addEventListener('submit', function (event) {

    event.preventDefault();

    const valido =
        validarNomeProduto() &&
        validarTempoUso() &&
        validarCategoria() &&
        validarDescricao() &&
        validarTroca();

    if (valido) {
         enviarProduto();
    }
    fetch('https://localhost:7132/usuario/cadastrar', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Nome: document.getElementById("nome").value,
            Matricula: document.getElementById("numMatricula").value,
            Email: document.getElementById("email").value,
            Telefone: document.getElementById("numTelefone").value,
            Senha: document.getElementById("senha").value,
            Status_usuario: true,
        }),
    })
      
    .then(response => response.json())
    .then(data => {

        console.log("Sucesso:", data);

        alert("Conta criada com sucesso!");

        myForm.reset();

    })
    .catch(error => {
       
    });

});

