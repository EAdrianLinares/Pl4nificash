import {
    validarCorreo,//valida mail
    hoy, //valida fecha
    cerrarSesion, //Cierra sesion del Usuario
} from "./main.js";


let fechaAct = document.getElementById('fechaActual')
document.getElementById('fechaActual').innerText = hoy.dia()

let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
document.getElementById('usuario').innerHTML = "Hola, " + usuario.nombre

document.getElementById("salir").addEventListener("click", function(e){
    e.preventDefault();
    cerrarSesion()
})