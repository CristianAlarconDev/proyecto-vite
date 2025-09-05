/* Repasar concepto de promesas y async*/
async function cargarData() {
    const respuesta = await fetch('/data/hero.json'); 
    const dataHero = await respuesta.json();
    
    const templateHTML =document.querySelector('#slide-template');
    dataHero.forEach(data => { 
        slideDesdeTemplate(data, templateHTML);
        
    });
/*
    dataHero.forEach(data => 
        {const section =crearSlide(data);
            console.log(section.outerHTML);
        contenedorHTML.appendChild(section);
        });*/
    return true;
    }

function slideDesdeTemplate(dataJSON, template){
    const contenedorHTML=document.querySelector("#hero");
    const plantilla = template.content.cloneNode(true);
    const seccion= plantilla.querySelector('.slide');
    seccion.style.backgroundImage=`url(${dataJSON.img})`;
    seccion.querySelector('h2').textContent = dataJSON.titulo;
    seccion.querySelector('p').textContent = dataJSON.descripcion;
    contenedorHTML.appendChild(plantilla);
}

function crearSlide(dataJSON){

    const section = document.createElement('section');
    section.classList.add('slide');
    //const imagen = document.createElement('img');
    //imagen.src=dataJSON.img;
    section.style.backgroundImage = `url(${dataJSON.img})`;
    const titulo=document.createElement('h2');
    titulo.textContent=dataJSON.titulo;
    const parrafo= document.createElement('p');
    parrafo.textContent=dataJSON.descripcion;
    section.append(titulo, parrafo);
    //section.append(imagen, titulo, parrafo);
    return section;
}


function obtenerSlides(){
    const slides = document.querySelectorAll('#hero .slide');
    //console.log(slides);
    return slides;
}
async function iniciarHero() {
    await cargarData();        
    obtenerSlides();           
}

iniciarHero();
