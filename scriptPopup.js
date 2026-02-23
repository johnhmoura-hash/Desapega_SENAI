
const btnNotificacao = document.getElementById("btnNotificacao");
const popupNotificacao = document.getElementById("popupNotificacao");

const btnChat = document.getElementById("btnChat");
const popupChat = document.getElementById("popupChat");

btnNotificacao.addEventListener("click", function(e) {
  e.preventDefault();
  popupNotificacao.classList.toggle("ativo");
  popupChat.classList.remove("ativo");
});

btnChat.addEventListener("click", function(e) {
  e.preventDefault();
  popupChat.classList.toggle("ativo");
  popupNotificacao.classList.remove("ativo");
});

document.addEventListener("click", function(e) {
  if (!btnNotificacao.contains(e.target) && 
      !popupNotificacao.contains(e.target) &&
      !btnChat.contains(e.target) &&
      !popupChat.contains(e.target)) {

    popupNotificacao.classList.remove("ativo");
    popupChat.classList.remove("ativo");
  }
});


const perguntas = document.querySelectorAll(".pergunta");
const chatMensagens = document.getElementById("chatMensagens");

perguntas.forEach(pergunta => {
  pergunta.addEventListener("click", function() {

    // Mensagem do usuário
    const userMsg = document.createElement("div");
    userMsg.classList.add("mensagem", "user-msg");
    userMsg.innerText = this.innerText;
    chatMensagens.appendChild(userMsg);

    // Resposta automática
    setTimeout(() => {
      const botMsg = document.createElement("div");
      botMsg.classList.add("mensagem", "bot");

      if (this.innerText.includes("disponível")) {
        botMsg.innerText = "Sim, o produto ainda está disponível 😊";
      } 
      else if (this.innerText.includes("frete")) {
        botMsg.innerText = "O frete é calculado no momento da compra.";
      } 
      else if (this.innerText.includes("fotos")) {
        botMsg.innerText = "Claro! Vou enviar mais fotos agora 📸";
      } 
      else {
        botMsg.innerText = "Obrigado pelo contato!";
      }

      chatMensagens.appendChild(botMsg);
      chatMensagens.scrollTop = chatMensagens.scrollHeight;

    }, 800);

    chatMensagens.scrollTop = chatMensagens.scrollHeight;
  });
});


