/* Lee datos de un json y devuelve su contenido en NodeList*/
async function cargarData(archivoJson) {
  const respuesta = await fetch(archivoJson);
  return await respuesta.json();
}
/*Recibe un node y un template html; carga la info en el template y devuelve la plantilla */
function renderizarSlide(dataJSON, template) {
  const plantilla = template.content.cloneNode(true);
  const seccion = plantilla.querySelector(".slide");

  seccion.style.backgroundImage = `url(${dataJSON.img})`;
  seccion.querySelector("h2").textContent = dataJSON.titulo;
  seccion.querySelector("p").textContent = dataJSON.descripcion;
  //console.log(seccion.outerHTML);
  return plantilla;
}

/*Recibe Nodelist y agrega a un contenedor todos los nodos*/
function renderHero(slidesData, contenedorHTML, templateHTML) {

  slidesData.forEach((data) => {
    const slide = renderizarSlide(data, templateHTML);
    contenedorHTML.appendChild(slide);
  });
}

async function iniciarHero() {
  const contenedor = document.querySelector("#hero");
  const template = document.querySelector("#slide-template");
  const dataHero = await cargarData("/data/hero.json");

  renderHero(dataHero, contenedor,template);
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

function obtenerSlides() {
  const slides = document.querySelectorAll("#hero .slide");
  return slides;
}

class Carroussel {

  constructor(slides) {
    this.slides = slides
    this.indiceActual = 0;

    this.slides.forEach(slide => {
      slide.querySelector(".btn-siguiente").
      addEventListener("click",
        () => this.siguienteSlide()
      );
      slide.querySelector(".btn-anterior").
      addEventListener("click",
        () => this.anteriorSlide()
      );
    });
  }

  iniciarCarroussel(){
    this.mostrarSlide(0);
  }
  mostrarSlide(indiceSlide) {
    this.slides.forEach((slide, indice) => {
      if (indice === indiceSlide) {
        this.slides[indice].style.display = "flex";
        this.indiceActual=indice;
      } else {
        this.slides[indice].style.display = "none";
      }
    });
   // console.log(this.slides[indiceSlide].outerHTML);
  }
  siguienteSlide() {
    this.indiceActual = (this.indiceActual + 1)%
    this.slides.length;
    this.mostrarSlide(this.indiceActual);
  }
  anteriorSlide() {
    this.indiceActual = (this.indiceActual - 1 + this.slides.length) % 
    this.slides.length;
    this.mostrarSlide(this.indiceActual);
  }

}


async function main() {
  await iniciarHero();
  const slides = obtenerSlides();
  const carroussel= new Carroussel(slides); 
  carroussel.iniciarCarroussel();

}
main();


