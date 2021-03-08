import { Funko } from "./funkoClass.js";

let listaFunkopop = [];
const modalProducto = new bootstrap.Modal(
  document.getElementById("modalFunkopop")
);
// variable bandera que me ayuda a decidir cuando tengo que modificar y cuando creo un nuevo funkopop
// modificarFunkopop=true estoy modificando un producto, cuando sea false estoy agregando un nuevo funkopop.
let modificarFunkopop = false; 

let btnAgregar = document.getElementById("btnAgregar");

btnAgregar.addEventListener("click", function () {
  limpiarFormulario();
  modalProducto.show();
});

// llamar a la funcion que lee datos del localstorage
leerDatos();

function agregarFunkopop() {
  console.log("dentro de agregar funko");
  // validar general
  // if(validarGeneral()){
  // // aqui agrego un nuevo producto - continua en 1
  // }else{
  // }

  // parte 1
  let codigo = document.getElementById("codigo").value;
  let nombre = document.getElementById("nombre").value;
  let numSerie = document.getElementById("numSerie").value;
  let categoria = document.getElementById("categoria").value;
  let descripcion = document.getElementById("descripcion").value;
  let imagen = document.getElementById("imagen").value;

  // creo el nuevo producto funkopop
  let nuevoFunkopop = new Funko(
    codigo,
    nombre,
    numSerie,
    categoria,
    descripcion,
    imagen
  );
  // agrego el nuevo funkopop a la lista
  listaFunkopop.push(nuevoFunkopop);
  // guardar lista de funkopop en localstorage
  localStorage.setItem("listaFunkoKey", JSON.stringify(listaFunkopop));
  // limpiar el formulario
  limpiarFormulario();
  // mostrar mensaje al usuario que el producto fue creado
  Swal.fire("Nuevo Funkopop", "El funkopop se agrego correctamente", "success");
  //   llamar a la funcion
  leerDatos();
  // cerrar la ventana modal
  modalProducto.hide();
};

function limpiarFormulario() {
  document.getElementById("formFunkopop").reset();
  modificarFunkopop=false;
}

function leerDatos() {
  // esta funcion se encargara de leer los datos del localstorage
  if (localStorage.length > 0) {
    // traer los datos del localstorage
    let _listaFunkopop = JSON.parse(localStorage.getItem("listaFunkoKey"));
    console.log(_listaFunkopop);

    // Preguntar si mi arreglo listaFunkopop tiene datos
    if (listaFunkopop.length === 0) {
      listaFunkopop = _listaFunkopop;
    }

    dibujarDatosEnTabla(_listaFunkopop);
  }
}

function dibujarDatosEnTabla(_listaFunkopop) {
  // esta funcion se encargara de agregar los datos del LS en cada fila de la tabla
  let tabla = document.getElementById("tablaFunkopop");
  // borramos las filas
  tabla.innerHTML = "";
  let filas;

  // for(let i=0; i<_listaFunkopop.length; i++){}
  // recorro todo el arreglo
  for (let i in _listaFunkopop) {
    filas = `<tr>
        <td>${_listaFunkopop[i].codigo}</td>
        <td>${_listaFunkopop[i].nombre}</td>
        <td>${_listaFunkopop[i].numSerie}</td>
        <td>${_listaFunkopop[i].categoria}</td>
        <td>${_listaFunkopop[i].descripcion}</td>
        <td>${_listaFunkopop[i].imagen}</td>
        <td>
            <button class="btn btn-warning" onclick="prepararFunkopop(this)" id="${_listaFunkopop[i].codigo}">Editar</button>
            <button class="btn btn-danger" onclick="eliminarFunkopop(this)" id="${_listaFunkopop[i].codigo}">Borrar</button>
        </td>
    </tr>`;
    // agregar la fila al padre
    tabla.innerHTML += filas;
    //  tabla.innerHTML = tabla.innerHTML + filas;
  }
}

window.eliminarFunkopop = function (boton){
    console.log(boton.id);
    Swal.fire({
      title: 'Esta seguro de eliminar el Funkopop',
      text: "No puedes volver atras luego de eliminar un funkopop",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:'Cancelar',
    }).then((result) => {
      // if(true)
      if (result.isConfirmed) {
        // agregar la logica para eliminar el funkopop
        // let funkopopFiltrado = listaFunkopop.filter(function (producto){
        //   return producto.codigo != boton.id
        // });
        let funkopopFiltrado = listaFunkopop.filter((producto)=> producto.codigo != boton.id);

        console.log(funkopopFiltrado);
        listaFunkopop = funkopopFiltrado;
        // guardar los datos en localstorage
        localStorage.setItem('listaFunkoKey', JSON.stringify(funkopopFiltrado));
        // cargar los nuevos datos en la tabla
        leerDatos();

        Swal.fire(
          'Funkopop eliminado',
          'El funkopop seleccionado fue borrado',
          'success'
        )
      }
    })
}

window.prepararFunkopop = function (boton){
  // buscar el funkopop seleccionado
  let funkopopEncontrado = listaFunkopop.find((producto) =>{return producto.codigo === boton.id});

  console.log(funkopopEncontrado);
  // completar con los datos todos inputs de mi formulario
  document.getElementById('codigo').value = funkopopEncontrado.codigo;
  document.getElementById('nombre').value = funkopopEncontrado.nombre;
  document.getElementById('numSerie').value = funkopopEncontrado.numSerie;
  document.getElementById('categoria').value = funkopopEncontrado.categoria;
  document.getElementById('descripcion').value = funkopopEncontrado.descripcion;
  document.getElementById('imagen').value = funkopopEncontrado.imagen;
  // cambiar el estado de mi variable modificarFunkopop
  modificarFunkopop = true;
  // mostrar ventana modale
  modalProducto.show();
}

window.guardarFunko = function(event){
  event.preventDefault();
  // if(true) es lo mismo que if(true===true)
  if(modificarFunkopop){
    // modificar un funkopop existente
    modificarFunkoExistente();
  }else{
    agregarFunkopop();
  }
}


function modificarFunkoExistente(){
  // validar nuevamente los datos ingresados
// tomar los valores modificados del formulario
let codigo = document.getElementById('codigo').value;
let nombre = document.getElementById('nombre').value;
let categoria = document.getElementById('categoria').value;
let numSerie = document.getElementById('numSerie').value;
let descripcion = document.getElementById('descripcion').value;
let imagen = document.getElementById('imagen').value;
// buscar el objeto y modifico sus datos
for(let i in listaFunkopop){
  if(listaFunkopop[i].codigo === codigo){
    listaFunkopop[i].nombre = nombre;
    listaFunkopop[i].categoria = categoria;
    listaFunkopop[i].numSerie = numSerie;
    listaFunkopop[i].descripcion = descripcion;
    listaFunkopop[i].imagen = imagen;
  }
}
// actualizo el localstorage
localStorage.setItem('listaFunkoKey', JSON.stringify(listaFunkopop));
// mostrar alerta al usuario
Swal.fire("Funkopop modificado", "El funkopop seleccionado fue modificado exitosamente.", "success");
// dibujo los datos actualizados en la tabla
leerDatos();
// cerrar ventana modal
modalProducto.hide();
}