import {Funko} from './funkoClass.js';

let nuevoFunkopop = new Funko(1,'dasd','asdas22323','dc','sASfsdfsdf','sdfsdfsdf');
console.log(nuevoFunkopop)

window.agregarFunkopop = function(event){
    event.preventDefault();
    console.log('dentro de agregar funko');
}