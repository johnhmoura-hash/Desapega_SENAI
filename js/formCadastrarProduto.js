//form Cadastrar Produto
const formProduto = document.getElementById('formProduto');
const nomeProduto = document.getElementById('nomeProduto');
const tempoUso = document.getElementById('tempoUso');
const categoria = document.getElementById('categoria');
const descricao = document.getElementById('descricao');
const troca = document.getElementById('troca');
const inputFoto = document.getElementById("inputFoto");

if (inputFoto) {
  inputFoto.addEventListener("change", function () {
    const arquivo = this.files[0];

    if (!arquivo) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      const containerFoto = document.querySelector(".photo-upload");

      if (containerFoto) {
        containerFoto.innerHTML = `
          <img src="${e.target.result}" 
               style="width:100%; border-radius:8px; object-fit:cover;">
        `;
      }
    };

    reader.readAsDataURL(arquivo);
  });
}

if (formProduto) {

formProduto.addEventListener('submit', (e) => {
    e.preventDefault();

    const valido =
        validarNomeProduto() &&
        validarTempoUso() &&
        validarCategoria() &&
        validarDescricao() &&
        validarTroca();

    if (valido) {
         enviarProduto();
    }
});

if (nomeProduto) nomeProduto.addEventListener("keyup", validarNomeProduto);
if (descricao) descricao.addEventListener("keyup", validarDescricao);


// ===== FUNÇÕES =====

function validarNomeProduto(){
    const valor = nomeProduto.value.trim();

    if(valor === ''){
        erro(nomeProduto);
        return false;
    } else if(valor.length < 3){
        erro(nomeProduto);
        return false;
    } else {
        sucesso(nomeProduto);
        return true;
    }
}

function validarTempoUso(){
    if(!tempoUso.value){
        erro(tempoUso);
        return false;
    } else {
        sucesso(tempoUso);
        return true;
    }
}

function validarCategoria(){
    if(!categoria.value){
        erro(categoria);
        return false;
    } else {
        sucesso(categoria);
        return true;
    }
}

function validarDescricao(){
    const valor = descricao.value.trim();

    if(valor === ''){
        erro(descricao);
        return false;
    } else if(valor.length < 10){
        erro(descricao);
        return false;
    } else {
        sucesso(descricao);
        return true;
    }
}

function validarTroca(){
    if(!troca.value){
        erro(troca);
        return false;
    } else {
        sucesso(troca);
        return true;
    }
}

function enviarProduto() {

    const dados = {
        nome: nomeProduto.value,
        tempoUso: tempoUso.value,
        categoria: categoria.value,
        descricao: descricao.value,
        troca: troca.value
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
        alert("Produto anunciado com sucesso!");
        formProduto.reset();
        limparBordas();
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao anunciar produto.");
    });
}

// ===== ESTILO VISUAL =====

function erro(input){
    input.style.border = "1px solid red";
}

function sucesso(input){
    input.style.border = "1px solid green";
}

function limparBordas(){
    const campos = formProduto.querySelectorAll(".input-info");
    campos.forEach(campo => campo.style.border = "");
}

}                                                                                