
// Validaciones de formularios (login y registro)
// Se conectan con auth.js

/**
 * Valida el formulario de inicio de sesión.
 * @returns {boolean} false para prevenir el envío tradicional.
 */
function validarLogin() {
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    if (usuario === "" || password === "") {
        alert("Por favor, complete todos los campos.");
        return false;
    }

    // Llamar a la función de autenticación
    if (iniciarSesion(usuario, password)) {
        // Redirigir a la página principal tras login exitoso
        window.location.href = "principal.html";
    } else {
        // iniciarSesion ya muestra su propio mensaje de error
        return false;
    }
    return false; // Evitar envío convencional
}

/**
 * Valida el formulario de registro con reglas más estrictas.
 * @returns {boolean} false si hay errores.
 */
function validarRegistro() {
    // Obtener valores (usando trim para eliminar espacios)
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value; // No trim porque puede tener espacios intencionales
    const telefono = document.getElementById("telefono").value.trim();

    
    if (nombre === "" || correo === "" || usuario === "" || password === "" || telefono === "") {
        alert("Por favor, complete todos los campos.");
        return false;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        alert("Ingrese un correo electrónico válido.");
        return false;
    }

  
    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return false;
    }

    const telefonoRegex = /^\d{7,10}$/;
    if (!telefonoRegex.test(telefono)) {
        alert("Ingrese un número de teléfono válido (7 a 10 dígitos, sin espacios).");
        return false;
    }

  
    if (registrarUsuario(usuario, password)) {
        alert("Registro exitoso. ¡Bienvenido a FastBite!");
        window.location.href = "principal.html"; // Redirigir tras registro
    } else {
     
        return false;
    }
    return false; 
}