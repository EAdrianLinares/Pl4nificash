import {
    validarCorreo,//valida mail
    hoy, //valida fecha
    cerrarSesion, //Cierra sesion del Usuario
} from "./main.js";


let fechaAct = document.getElementById('fechaActual')
document.getElementById('fechaActual').innerText = hoy.dia()


