document.addEventListener("DOMContentLoaded", function () {

  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const overlayMenu = document.getElementById("overlayMenu");

  if(toggle){
    toggle.addEventListener("click", function(){
      menu.classList.toggle("ativo");
      overlayMenu.classList.toggle("ativo");
    });
  }

  if(overlayMenu){
    overlayMenu.addEventListener("click", function(){
      menu.classList.remove("ativo");
      overlayMenu.classList.remove("ativo");
    });
  }

});