import { cargarData } from "./hero.js";

const productos =await cargarData("/data/living.json");
const template = document.querySelector("#template-living");
const contenedor = document.querySelector("#living");


function renderizarSeccion(itemJSON, templateHtml){
  const plantilla= templateHtml.content.cloneNode(true);
  const seccion= plantilla.querySelector(".producto");
  seccion.querySelector("img").src=itemJSON.img;
  seccion.querySelector("h3").textContent = itemJSON.titulo;
  seccion.querySelector("p").textContent = itemJSON.descripcion;
  seccion.querySelector(".precio").textContent=itemJSON.precio;
  return plantilla;
}

productos.forEach(producto => 
  {
    const item =renderizarSeccion(producto, template);
    contenedor.appendChild(item);
  });