//Form feira de trocas
const formFeira = document.getElementById('formFeira');
if(formFeira){
formFeira.addEventListener('submit', (e) =>{
    e.preventDefault();

    const valido =

        validarNome() &&
        validarMatricula();

    if(valido){enviarFormulario();
    }
}); 

function validarNome(){ 
    const nomeValor = nome.value.trim();
    
    if(nomeValor === ''){
        validarErro(nome, 'Campo obrigatório');
        return false;
    } else if(nomeValor.length < 3) {
          validarErro(nome, 'Campo obrigatório');
        return false;
    }else{
        validarSucesso(nome);
        return true;
    }
}

function validarMatricula(){
     const numMatriculaValor = numMatricula.value.trim();   

    if(numMatriculaValor === ''){
        validarErro(numMatricula, 'Campo obrigatório');
        return false;
    } else if(numMatriculaValor.length !== 7){
        validarErro(numMatricula, 'A matrícula deve conter 7 números');
        return false;
    }else{
        validarSucesso(numMatricula);
        return true;
    }

}
function validarErro(input, mensagem){
    const campo = input.parentElement;
    const small = campo.querySelector("small");

    small.innerText = mensagem; // coloca o texto
    campo.className = "campo error";
}

function validarSucesso(input){
    const campo = input.parentElement;
    const small = campo.querySelector("small");

    small.innerText = "";
    campo.className = "campo success";
}
function enviarFormulario() {

    const dados = {
        nome: nome.value,
        matricula: numMatricula.value,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Sucesso:", data);
        alert("Inscrição salva com sucesso!");
        window.location.href = "index.html"; 
    })
    .catch(error => {
        console.error("Erro:", error);
    });

}
}