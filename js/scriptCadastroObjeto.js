


//form Cadastrar Produto
const formProduto = document.getElementById('formProduto');
const inputFoto = document.getElementById("inputFoto");

inputFoto.addEventListener("change", function () {
  const arquivo = this.files[0];

  if (!arquivo) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const containerFoto = document.querySelector(".photo-upload");

    containerFoto.innerHTML = `
      <img src="${e.target.result}" class="preview-foto">
      <input type="file" id="inputFoto" accept="image/*" style="display:none;">
    `;
  };

  reader.readAsDataURL(arquivo);
});

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
function enviarProduto() {

    const formData = new FormData();
formData.append('nome', document.getElementById("nomeProduto").value);
formData.append('descricao', document.getElementById("descricao").value);
formData.append('categoria', document.getElementById("categoria").value);
formData.append('tempo_uso', document.getElementById("tempoUso").value);
formData.append('prefere_troca', document.getElementById("troca").value);
formData.append('status_objeto', true);
formData.append('foto', 'gggh');


formData.append('arquivoFoto', inputFoto.files[0]); 

fetch('https://localhost:7132/objeto', { // Substitua pela URL local do seu projeto C#
    method: 'POST',
    credentials: 'include',
    body: formData
})
.then(res => res.json())
.then(dados => console.log(dados))
.catch(err => console.error(err));
}

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
                                                                             