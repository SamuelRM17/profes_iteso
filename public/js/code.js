const modalProfesor = new bootstrap.Modal(document.getElementById('modalProfesor'))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;

    id_editar.value = fila.children[0].innerHTML;
    Profesor_editar.value = fila.children[1].innerHTML;
    Telefono_editar.value = fila.children[2].innerHTML;
    Correo_editar.value = fila.children[3].innerHTML;
    IAE_editar.value = fila.children[4].innerHTML;
    //lista de materias
    const listaUl = fila.children[5].children[0];
    const materias = [];
    //Accedemos a cada children de cada children y lo añadimos al arreglo de materias.
    for (let i = 0; i < listaUl.children.length; i++) {
        const contenidoLi = listaUl.children[i].innerHTML;
        materias.push(contenidoLi); 
    }

    console.log(materias);

    Materias_editar.value = materias;
    modalProfesor.show()
});
