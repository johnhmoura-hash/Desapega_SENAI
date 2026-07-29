function mostrarToast(mensagem, tipo = "info") {

   

    const toast = document.getElementById("toast");
    const texto = document.getElementById("toastMensagem");

    toast.className = "toast";
    toast.classList.add(tipo);

    texto.textContent = mensagem;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}