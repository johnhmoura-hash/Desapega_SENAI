
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const over = document.getElementById("overlayMenu");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("ativo");
    overlay.classList.toggle("ativo");
  });

  overlay.addEventListener("click", () => {
    menu.classList.remove("ativo");
    overlay.classList.remove("ativo");
  });