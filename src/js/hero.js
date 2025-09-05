/* Repasar concepto de promesas y async*/
async function cargarData() {
  const respuesta = await fetch("/data/hero.json");
  return await respuesta.json();
}

function renderizarSlide(dataJSON, template) {
  const plantilla = template.content.cloneNode(true);
  const seccion = plantilla.querySelector(".slide");

  seccion.style.backgroundImage = `url(${dataJSON.img})`;
  seccion.querySelector("h2").textContent = dataJSON.titulo;
  seccion.querySelector("p").textContent = dataJSON.descripcion;

  //console.log(seccion.outerHTML);
  return plantilla;
}
function renderHero(slidesData) {
  const contenedorHTML = document.querySelector("#hero");
  const templateHTML = document.querySelector("#slide-template");
  slidesData.forEach((data) => {
    const slide = renderizarSlide(data, templateHTML);

    contenedorHTML.appendChild(slide);
  });
}

function obtenerSlides() {
  const slides = document.querySelectorAll("#hero .slide");
  return slides;
}
async function iniciarHero() {
  const dataHero = await cargarData();
  renderHero(dataHero);

  //const slides=obtenerSlides();
  //console.log(slides);
}
/*
function mostrarSlide(indiceSlide) {
  const slides = obtenerSlides();
  slides.forEach((slide, indice) => {
    if (indice === indiceSlide) {
      slides[indice].style.display = "flex";
    } else {
      slides[indice].style.display = "none";
    }
  });
  console.log(slides[indiceSlide]);
}
*/

async function iniciarCarroussel() {
  //const indice = 1;
  await iniciarHero();
  //mostrarSlide(indice);
}
iniciarCarroussel();

class Carroussel {
  constructor(selector) {
    this.contenedor = document.querySelector(selector);
    this.slides = [];
    this.indiceActual = 0;
  }

  mostrarSlide(indiceSlide) {
    slides.forEach((slide, indice) => {
      if (indice === indiceSlide) {
        slides[indice].style.display = "flex";
      } else {
        slides[indice].style.display = "none";
      }
    });
    console.log(slides[indiceSlide]);
  }
  siguienteSlide() {
    this.indiceActual = (this.indiceActual + 1) % this.slides.length;
    this.mostrarSlide(this.indiceActual);
  }

  anteriorSlide() {
    this.indiceActual = (this.indiceActual - 1 + this.slides.length) % this.slides.length;
    this.mostrarSlide(this.indiceActual);
  }

}
