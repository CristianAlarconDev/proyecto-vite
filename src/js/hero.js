/* Lee datos de un json y devuelve su contenido en NodeList*/
export async function cargarData(archivoJson) {
  const respuesta = await fetch(archivoJson);
  return await respuesta.json();
}
/*Recibe un node y un template html; carga la info en el template y devuelve la plantilla */
function renderizarSlide(dataJSON, template) {
  const plantilla = template.content.cloneNode(true);
  const seccion = plantilla.querySelector(".slide");

 // seccion.style.backgroundImage = `url(${dataJSON.img})`;
  seccion.querySelector("img").src=dataJSON.img;
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

function obtenerSlides() {
  const slides = document.querySelectorAll("#hero .slide");
  return slides;
}

class Carroussel {

  constructor(slides) {
    this.slides = slides
    this.indiceActual = 0;
  }

  comenzarRecorrido(){
    this.slides.forEach((slide, idx) => 
      {
      slide.style.display = idx === 0 ? "flex" : "none";
      const btnSig= slide.querySelector(".btn-siguiente");
      btnSig.addEventListener("click", () => this.siguienteSlide());
      const btnAnt=slide.querySelector(".btn-anterior");
      btnAnt.addEventListener("click", () => this.anteriorSlide());
    });
  }
  mostrarSlide(indiceNuevo) {
    if (indiceNuevo === this.indiceActual) return;
    this.slides[this.indiceActual].style.display = "none";
    this.slides[indiceNuevo].style.display = "flex";
    this.indiceActual = indiceNuevo;
  }
  siguienteSlide() {
    const nuevo = (this.indiceActual + 1) % this.slides.length;
    this.mostrarSlide(nuevo);
  }
  anteriorSlide() {
    const nuevo = (this.indiceActual - 1 + this.slides.length) % this.slides.length;
    this.mostrarSlide(nuevo);
  }

}


async function main() {
  await iniciarHero();
  const slides = obtenerSlides();
  const carroussel= new Carroussel(slides); 
  carroussel.comenzarRecorrido();

}
main();


