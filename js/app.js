// variable que almacena los datos del localstorage
let listaFunkoPop = [];
leerFunkopop();

function leerFunkopop() {
  if (localStorage.length > 0) {
    listaFunkoPop = JSON.parse(localStorage.getItem("listaFunkoKey"));
    //borrar los datos de la fila de cards
    let filaCards = document.getElementById("filaCards");
    filaCards.innerHTML = "";

    // dibujar cada columna con los datos de los funkopop
    for (let i in listaFunkoPop) {
      let columna = `<div class="col-md-3 col-sm-6 my-2">
        <div class="card w-100 shadow">
            <img src="img/productos/${listaFunkoPop[i].imagen}" class="card-img-top" alt="Funko ${listaFunkoPop[i].nombre}">
            <div class="card-body">
                <h5 class="card-title">${listaFunkoPop[i].nombre}</h5>
                <p class="card-text">${listaFunkoPop[i].descripcion}</p>
                <a href="#" class="btn btn-primary disabled">Ver más</a>
            </div>
        </div>
    </div>`;

    // agregar las columnas a su elemento padre
    filaCards.innerHTML += columna;
    }
  }
}
