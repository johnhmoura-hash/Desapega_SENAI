document.addEventListener("DOMContentLoaded", function () {

     const id = new URLSearchParams(window.location.search).get("id");

    console.log("ID:", id);

fetch(`https://localhost:7132/Objeto/perfil/${id}` ,{
 credentials: "include"})
.then(response => response.json())
.then(data => {

       console.log(data);

    document.getElementById("produto-desejado").innerHTML = `
            
           <div class="usuario">
            <img src="" class="foto-perfil">
            <span>${data.usuarios}</span>
        </div>

        <div class="cardr">
            <div class="imagem">
                <img src="${data.foto}">
            </div>

            <div class="infos">
                <h3>${data.objetos}</h3>
                <span>${data.tempo_uso}</span>
            </div>
        </div>

            </div>

    `;
});





});


