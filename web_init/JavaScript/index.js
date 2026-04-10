

import {
    validarCorreo,//valida mail
    hoy //valida fecha
} from "./main.js";



//Validación inicio de sesion, pendiente incluir listado de usuarios
(() => {
    'use strict'

    let form = document.getElementById('formIndex')
    let correoInput = document.getElementById('correoIndex')
    let password = document.getElementById('clave')

    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault()
            event.stopPropagation()

            if (!validarCorreo.validacion(correoInput.value)) {
                correoInput.setCustomValidity("Valide el formato del correo")
                correoInput.reportValidity();
                return;
            } else {
                correoInput.setCustomValidity("");
            }

            //accedo a la base de Datos
            let usuarios = localStorage.getItem('usuarios')
            usuarios = usuarios ? JSON.parse(usuarios) : [];
            //.find busca en el array que coincida con correoInput
            let usuarioEncontrado = usuarios.find(usuario => usuario.correo === correoInput.value)
            //si no hay coincidicencias alerta de no creado
            if (!usuarioEncontrado) {
                alert("Correo no Registrado")
                return
            }
            let passwordUsuario = usuarioEncontrado.clave
            //Valida que la clave del usuario en el array coincida con la escrita
            if (usuarioEncontrado.clave !== password.value) {
                alert("Contraseña Errónea")
                password.setCustomValidity("Validar contraseña")
                password.reportValidity()
                return
            }

            form.classList.add('was-validated');

           //si ambos campos son correctos, da un mensaje de bienvenida y borra el formulario
            if (usuarioEncontrado && passwordUsuario) {
                localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
                window.location.href = "Pages/Disponible.html";
                form.reset();
                form.classList.remove('was-validated')
            }

            

        })
    }
})();

