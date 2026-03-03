
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const over = document.getElementById("overlayMenu");
if(over){
  toggle.addEventListener("click", () => {
    menu.classList.toggle("ativo");
    overlay.classList.toggle("ativo");
  });

  overlay.addEventListener("click", () => {
    menu.classList.remove("ativo");
    overlay.classList.remove("ativo");
  });
}

const slider = document.querySelector('.ajuste');
if(slider){
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

/* suporte a toque */
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', (e) => {
  const x = e.touches[0].pageX;
  const walk = (x - startX);
  slider.scrollLeft = scrollLeft - walk;
});
}