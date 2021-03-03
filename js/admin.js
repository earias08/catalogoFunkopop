import { Funko } from "./funkoClass.js";

let listaFunkopop = [];
const modalProducto = new bootstrap.Modal(
  document.getElementById("modalFunkopop")
);
let btnAgregar = document.getElementById("btnAgregar");

btnAgregar.addEventListener("click", function () {
  modalProducto.show();
});

// llamar a la funcion que lee datos del localstorage
leerDatos();

window.agregarFunkopop = function (event) {
  event.preventDefault();
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
            <button class="btn btn-warning">Editar</button>
            <button class="btn btn-danger" onclick="eliminarFunkopop(this)">Borrar</button>
        </td>
    </tr>`;
    // agregar la fila al padre
    tabla.innerHTML += filas;
    //  tabla.innerHTML = tabla.innerHTML + filas;
  }
}

window.eliminarFunkopop = function (boton){
    console.log('dentro de la funcion funkopop')
}
