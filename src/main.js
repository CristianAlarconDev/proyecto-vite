import '@fortawesome/fontawesome-free/css/all.min.css';
import './header.css';

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const iconNav=menuBtn.querySelector("i");

/*Despliegue menu colapsable */

menuBtn.addEventListener("click", () => 
  desplegarNav(navLinks));


function desplegarNav(navADesplegar){
  navADesplegar.classList.toggle("open");
  const icon = menuBtn.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
}

/* Reinicio de imagen en menu hamburguesa y de condiciones en css dentro clase open.*/

window.addEventListener("resize", () => 
  redimensionarHeader(navLinks, "open"));


function redimensionarHeader(listaLinks, quitarSelector){
  if(window.innerWidth>720){
    listaLinks.classList.remove(quitarSelector);
    cambiarIcono(iconNav,"fa-bars","fa-xmark");
  }
}

function cambiarIcono(icono, Iagregar, Ieliminar){
  icono.classList.add(Iagregar);
  icono.classList.remove(Ieliminar);
}