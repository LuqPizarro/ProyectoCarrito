// Variables
const carrito = document.querySelector('#carrito');                         
const contenedorCarrito = document.querySelector('#lista-carrito tbody');   
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');           
const listaCursos = document.querySelector('#lista-cursos');                
let articulosCarrito = [];                                                 


cargarEventListener();
function cargarEventListener () {                                           

    // Agregando un curso al presionar el boton de "AGREGAR AL CARRITO"                                    
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar un curso
    carrito.addEventListener('click', eliminarCurso); 

    // Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
       

        limpiarHTML()
    })

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse (localStorage.getItem('articulos carrito')) || []
        console.log(articulosCarrito);
        carritoHTML();
    })
};

// Funciones
function agregarCurso(e){
    e.preventDefault()  

    if (e.target.classList.contains('agregar-carrito')){          
        const cursoSeleccionado = e.target.parentElement.parentElement; 
        leerDatosCurso(cursoSeleccionado)
    }

};


// Elimina un curso del carrito 
function eliminarCurso(e) {

    if (e.target.classList.contains('borrar-curso')){
                const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito mediante el data-id
        articulosCarrito = articulosCarrito.filter ( curso => cursoId !== curso.id);

        carritoHTML();
    }
}


// Creamos una funcion para leer los datos del card padre
function leerDatosCurso (curso) {
  
    // Crear un objeto con la info del curso
    const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    autor: curso.querySelector('p').textContent,
    precio: curso.querySelector('.u-pull-right').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
    
}  
    

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
   
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];                            
    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]                         
    };

    console.log(articulosCarrito)

    carritoHTML()
};

// Muestra el carrito de compras en el HTML 
function carritoHTML () {

    limpiarHTML()

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( (curso) => {
                                               
        const {imagen, titulo, precio, cantidad, id } = curso      
        const row = document.createElement('tr')      
        row.innerHTML = 
        `
        <td> <img src="${imagen}" width="100"> </td>
        <td> ${curso.titulo} </td> 
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td> <a href="#" class="borrar-curso" data-id="${id}"> X </td>
        `;

        contenedorCarrito.appendChild(row)
    })  

    agregarLocalStorage();
}

function agregarLocalStorage() {
    localStorage.setItem('articulos carrito', JSON.stringify(articulosCarrito))
}

// Elimina los cursos del Tbody
function limpiarHTML() {
    
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


