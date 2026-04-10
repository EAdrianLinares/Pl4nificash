import { validarCorreo } from "./main.js";

// Validacion Formulario de Registro

document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById('formRegistro')
    let nombre = document.getElementById('nombres')
    let apellido = document.getElementById('apellidos')
    let password = document.getElementById('clave')
    let passwordValidate = document.getElementById('claveValidate')
    let correoInput = document.getElementById('correoRegistro')

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();


        //validamos el correo
        if (!validarCorreo.validacion(correoInput.value)) {
            correoInput.setCustomValidity("Valide el formato del correo")
            correoInput.reportValidity();
            return;
        } else {
            correoInput.setCustomValidity("");
        }
        //validamos contraseñas

        if (password.value !== passwordValidate.value) {
            passwordValidate.setCustomValidity("Las contraseñas NO coinciden");
            correoInput.reportValidity();
            return;
        } else {
            passwordValidate.setCustomValidity("");
        }

        //Validamos el formulario
        form.classList.add('was-validated');

        // si hay errores no guardamos el usuario
        if (!form.checkValidity()) {
            return;
        }


        //crear mediante el formulario un listado o array
        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            correo: correoInput.value,
            clave: password.value
        };

        //valido la existencia del Array
        let usuarios = localStorage.getItem("usuarios");
        usuarios = usuarios ? JSON.parse(usuarios) : [];//si existe usuario conv a json sino array
        //Valido que no se duplique el correo, y guardo 
        let mailExiste = usuarios.some(usuario => usuario.correo === datos.correo);
        if (mailExiste) {
            alert("Ya existe un usuario con este mail, por favor Valide.!")
            return;
        } else {
            usuarios.push(datos);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }
        form.classList.add('was-validated');

        if (form.checkValidity()) {
            alert("Registro Exitoso");
            form.reset();
            form.classList.remove('was-validated')
        }
    })
})
