import '@fortawesome/fontawesome-free/css/all.min.css';
import './header.css';

const menuBtn = document.querySelector(".menu-btn");
const navMobile = document.querySelector(".nav-mobile");

menuBtn.addEventListener("click", () => {
  navMobile.classList.toggle("open");

  // Cambiar icono
  const icon = menuBtn.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

// Escuchar resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 720) {
    // cerrar menú mobile y resetear icono
    navMobile.classList.remove("open");
    const icon = menuBtn.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  }
});
