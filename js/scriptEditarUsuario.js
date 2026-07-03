

document.addEventListener("DOMContentLoaded", function () {

    fetch('https://localhost:7132/usuario/perfil', {
        credentials: "include"
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const resposta = document.getElementById("formEditar");

            if (!resposta) {
                console.error("Elemento #info não existe no HTML");
                return;
            }

            resposta.innerHTML += `

            <div class="photo">

                <img
                    id="previewFotos"
                    src="${data.foto_usuario}"
                    class="preview-foto"
                >

                <label for="inputFoto" class="fotoperfil">
                    <i class="ri-camera-line"></i>
                </label>

                <input
                    id="inputFoto"
                    type="file"
                    hidden
                    accept="image/*"
                >

            </div>
            <div class="grupo">
              <label>Nome</label>
              <input type="text" id="nome" value="${data.nome}">
            </div>

            <div class="grupo">
                <label>E-mail</label>
           <input type="email" id="email" value="${data.email}">
            </div>

            <div class="grupo">
                <label>Telefone</label>
                <input type="text" id="telefone" value="${data.telefone}">
            </div>

            <div class="camp">
                <input  type="submit" class="btn-salvar" value="Salvar Alterações">  
            </div>
            `;

            const inputFoto = document.getElementById("inputFoto");

            inputFoto.addEventListener("change", function () {

                const arquivo = this.files[0];

                if (!arquivo) return;

                const reader = new FileReader();

                reader.onload = function (e) {

                    document.getElementById("previewFotos").src = e.target.result;

                    // Esconde o ícone da câmera
                    document.querySelector(".fotoperfil").style.display = "none";
                };

                reader.readAsDataURL(arquivo);

                document
                    .querySelector(".btn-salvar")
                    .addEventListener("click", atualizarUsuario);

                async function atualizarUsuario(e) {

                    e.preventDefault();

                    const formData = new FormData();

                    formData.append(
                        "Nome",
                        document.getElementById("nome").value
                    );

                    formData.append(
                        "Email",
                        document.getElementById("email").value
                    );

                    formData.append(
                        "Telefone",
                        document.getElementById("telefone").value
                    );

                    const foto =
                        document.getElementById("inputFoto").files[0];

                    if (foto) {
                        formData.append(
                            "ArquivoFoto",
                            foto
                        );
                    }

                    const response = await fetch(
                        "https://localhost:7132/usuario/atualizar",
                        {
                            method: "PUT",
                            credentials: "include",
                            body: formData
                        }
                    );

                    const texto = await response.text();

                    console.log(texto);

                    if (!response.ok) {
                        alert(texto);
                        return;
                    }


                }


            });
        });
});

//     fetch(`https://localhost:7132/usuario/atualizar`, {
//          method: 'PUT',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {


//         const resposta = document.getElementById("formEditar");

//         if (!resposta) {
//             console.error("Elemento #info não existe no HTML");
//             return;
//         }

//         resposta.innerHTML = "";

//         for (let i = 0; i < data.length; i++) {

//             resposta.innerHTML += `
//             <div class="grupo">
//               <label>Nome</label>
//               <input type="text" value="${data.nome}">
//             </div>

//             <div class="grupo">
//                 <label>E-mail</label>
//            <input type="email" value="${data.email}">
//             </div>

//             <div class="grupo">
//                 <label>Telefone</label>
//                 <input type="text" value="${data.telefone}">
//             </div>

//             <div class="camp">
//                 <button class="btn-salvar">
//                       Salvar Alterações
//                 </button>
//             </div>
//             `;
//             ;
//         }
//     });
// });