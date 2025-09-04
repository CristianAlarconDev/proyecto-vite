/* Repasar concepto de promesas y async*/
async function cargarHero() {
    const respuesta = await fetch('/data/hero.json'); 
    const dataHero = await respuesta.json();
    const contenedorHTML=document.querySelector("#hero");
    dataHero.forEach(data => 
        {const section =crearSlide(data)
            console.log(section.outerHTML);
        contenedorHTML.appendChild(section);
        });
}

function crearSlide(dataJSON){
    const section = document.createElement('section');
    section.classList.add('slide');
    const imagen = document.createElement('img');
    imagen.src=dataJSON.img;
    const titulo=document.createElement('h2');
    titulo.textContent=dataJSON.titulo;
    const parrafo= document.createElement('p');
    parrafo.textContent=dataJSON.descripcion;

    section.append(imagen, titulo, parrafo);
    return section;
}

cargarHero();

