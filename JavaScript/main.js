//en este archivo, escribimos las funciones para reutilizar en los demas.

//funcion para validar que el correo este bien escrito
export const validarCorreo = {
   validacion(correo) {
    const correoReg = /^[\w\.-]+@[\w\.-]+\.[a-z]{2,}$/i;
    return correoReg.test(correo);
}
}


export const hoy = {
    dia() {
let fecha = new Date();
fecha = fecha.toLocaleDateString("es-CO", {
    
    day:"numeric",
    month: "long",
    year: "numeric"
})
return fecha
}
}

export function cerrarSesion ()  {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "/Index.html";
}


//almacenamiento
