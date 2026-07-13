function mostrarToast(mensagem, tipo = "sucesso") {

    const toast = document.getElementById("toast");

    toast.textContent = mensagem;

    toast.className = "toast";

    if(tipo === "erro"){
        toast.classList.add("erro");
    }

    toast.classList.add("mostrar");

    setTimeout(() => {
        toast.classList.remove("mostrar");
    }, 3000);
}