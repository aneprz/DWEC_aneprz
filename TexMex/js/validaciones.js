document.getElementById("formularioTexMex").addEventListener("submit", function(event) {
    event.preventDefault();
    let validar=true;

    //-----LLAMADA A LAS VALIDACIONES-----
    if (!validarNombre()){
        validar=false;
    }
    if (!validarApellido()){
        validar=false;
    }
    if (!validarFechaNacimiento()){
        validar=false;
    }
    if (!validarDocumentoConSuNumero()){
        validar=false;
    }
    if (!validarContraseña()){
        validar=false;
    }
    if (!validarRepetirContraseña()) {
        validar=false;
    }
    if (!validarCorreo()) {
        validar=false;
    }
    if (!validarRepetirCorreo()) {
        validar=false;
    }
    if (!validarTelefono()) {
        validar=false;
    }
    if (!validarDeclaraciones()){
        validar=false;
    }

    if (validar) {
        alert("✅Datos correctos");
    }
});

    //-----VALIDACIONES-----
    //Validar nombre
    function validarNombre(){
        let nombre=document.getElementById("nombre").value;
        if (nombre=="") {
            document.getElementById("errorNombre").style.display="inline-block";
            document.getElementById("errorNombre").textContent="❌Debe rellenar el campo Nombre.";
            return false;
        }else{
            document.getElementById("errorNombre").style.display="none";
            document.getElementById("errorNombre").textContent="";
            return true;
        }
    }

    //Validar apellido
    function validarApellido(){
        let apellido=document.getElementById("apellido1").value;
        if (apellido=="") {
            document.getElementById("errorApellido").style.display="inline-block";
            document.getElementById("errorApellido").textContent="❌Debe rellenar el campo apellido.";
            return false;
        }else{
            document.getElementById("errorApellido").style.display="none";
            document.getElementById("errorApellido").textContent="";
            return true;
        }
    }

    //Validar fecha de nacimiento
    function validarFechaNacimiento() {
        let fechaNacimiento=document.getElementById("fechaNacimiento").value;
        if (fechaNacimiento=="") {
            document.getElementById("errorFechaNacimiento").style.display="inline-block";
            document.getElementById("errorFechaNacimiento").textContent="❌Debe rellenar el campo Fecha de nacimiento.";
            return false;
        }else{
            let fechaActual=new Date();
            let nacimiento=new Date(fechaNacimiento);

            let edad=fechaActual.getFullYear()-nacimiento.getFullYear();
            let mes=fechaActual.getMonth()-nacimiento.getMonth();

            if (mes<0||(mes==0&&fechaActual.getDate()<nacimiento.getDate())) {
                edad--;
            }

            if (edad<18) {
                document.getElementById("errorFechaNacimiento").style.display="inline-block";
                document.getElementById("errorFechaNacimiento").textContent="❌Debe ser mayor de 18 años.";
                return false;
            } else{
                document.getElementById("errorFechaNacimiento").style.display="none";
                document.getElementById("errorFechaNacimiento").textContent="";
                return true;
            }
        }   
    }

    //Validar documento con su numero
    function validarDocumentoConSuNumero() {
        let tipoDocumento=document.getElementById("tipoDocumento").value;
        let numDocumento=document.getElementById("numDocumento").value;

        if (numDocumento=="") {
            document.getElementById("errorNumDocumento").style.display="inline-block";
            document.getElementById("errorNumDocumento").textContent="❌Debe rellenar el campo Nº de documento.";
            return false;
        }else{
            //Todas las validaciones necesarias para comprobar que el DNI es correcto
            if (tipoDocumento==="DNI") {
                let dni=numDocumento;
                if (dni.length<9) {
                    numDocumento=numDocumento.padStart(8, "0"); //Rellenar con 0 a la izquierda
                    document.getElementById("numDocumento").value=numDocumento;
                }

                let caracteres=/^[0-9]{8}[A-Za-z]$/;
                if (!caracteres.test(numDocumento)) {
                    document.getElementById("errorNumDocumento").style.display="inline-block";
                    document.getElementById("errorNumDocumento").textContent="❌Formato incorrecto: debe ser 8 números y 1 letra.";
                    return false;
                } else {
                    //Validar que la letra es correcta
                    let letras="TRWAGMYFPDXBNJZSQVHLCKE";
                    let num=parseInt(numDocumento.slice(0, 8)); //slice selecciona los caracteres indicados(los 8 primeros)
                    let letraCorrecta=letras[num%23];

                    if (numDocumento[8].toUpperCase()!==letraCorrecta) {
                        document.getElementById("errorNumDocumento").style.display="inline-block";
                        document.getElementById("errorNumDocumento").textContent="❌La letra del DNI no es correcta.";
                        return false;
                    } else {
                        document.getElementById("errorNumDocumento").style.display="none";
                        document.getElementById("errorNumDocumento").textContent="";
                        return true;
                    }
                }
            //Validar que si el documento es NIE tenga el formato correcto
            } else if (tipoDocumento=="NIE") {
                let caracteres=/^[XYZ]\d{7}[A-Z]$/i;
                if (!caracteres.test(numDocumento)) {
                    document.getElementById("errorNumDocumento").style.display="inline-block";
                    document.getElementById("errorNumDocumento").textContent="❌Formato incorrecto: debe ser 7 números, una letra final y otra inicial(XYZ).";
                    return false; 
                } else{
                    document.getElementById("errorNumDocumento").style.display="none";
                    document.getElementById("errorNumDocumento").textContent="";
                    return true;                    
                }
            }else{
                document.getElementById("errorNumDocumento").style.display="none";
                document.getElementById("errorNumDocumento").textContent="";
                return true;
            }
        }   
    }

    //Validar contraseña
    function validarContraseña() {
        let contraseña=document.getElementById("contraseña").value;
        let numeros=/[0-9]/;
        let simbolos=/[!@#%^&*]/;

        if (contraseña=="") {
            document.getElementById("errorContraseña").style.display="inline-block";
            document.getElementById("errorContraseña").textContent="❌Debe rellenar el campo Contraseña.";
            return false;
        }else if (contraseña.length<12) {
            document.getElementById("errorContraseña").style.display="inline-block";
            document.getElementById("errorContraseña").textContent="❌La contraseña debe tener al menos 12 carácteres.";
            return false;
        }else{
            if (!numeros.test(contraseña)) {
                document.getElementById("errorContraseña").style.display="inline-block";
                document.getElementById("errorContraseña").textContent="❌La contraseña debe tener al menos un número.";
                return false;
            } else if (!simbolos.test(contraseña)) {
                document.getElementById("errorContraseña").style.display="inline-block";
                document.getElementById("errorContraseña").textContent="❌La contraseña debe tener al menos un símbolo(!@#%^&*).";
                return false;
            } else{
                document.getElementById("errorContraseña").style.display="none";
                document.getElementById("errorContraseña").textContent="";
                return true;
            }
        }   
    }

    //Validar repetir contraseña
    function validarRepetirContraseña() {
        let contraseña=document.getElementById("contraseña").value;
        let repetirContraseña=document.getElementById("repetirContraseña").value;
        if (repetirContraseña=="") {
            document.getElementById("errorRepetirContraseña").style.display="inline-block";
            document.getElementById("errorRepetirContraseña").textContent="❌Debe rellenar el campo Repetir contraseña.";
            return false;
        }else if (contraseña==repetirContraseña) {
            document.getElementById("errorRepetirContraseña").style.display="none";
            document.getElementById("errorRepetirContraseña").textContent="";
            return true;
        }else{
            document.getElementById("errorRepetirContraseña").style.display="inline-block";
            document.getElementById("errorRepetirContraseña").textContent="❌Las contraseñas no coinciden.";
            return false;
        }   
    }

    //Validar correo electrónico
    function validarCorreo() {
        let correo=document.getElementById("correo").value;
        let formatoCorreo=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(correo==""){
            document.getElementById("errorCorreo").style.display="inline-block";
            document.getElementById("errorCorreo").textContent="❌Debe rellenar el campo Correo electrónico.";
            return false;
        }else if (!formatoCorreo.test(correo)) {
            document.getElementById("errorCorreo").style.display="inline-block";
            document.getElementById("errorCorreo").textContent="❌Formato de correo electrónico incorrecto.";
            return false;
        }else{
            document.getElementById("errorCorreo").style.display="none";
            document.getElementById("errorCorreo").textContent="";
            return true;
        }   
    }

    //Validar repetir correo electrónico
    function validarRepetirCorreo() {
        let correo=document.getElementById("correo").value;
        let repetirCorreo=document.getElementById("repetirCorreo").value;
        if (repetirCorreo=="") {
            document.getElementById("errorRepetirCorreo").style.display="inline-block";
            document.getElementById("errorRepetirCorreo").textContent="❌Debe rellenar el campo Repetir correo electrónico.";
            return false;
        }else if (repetirCorreo==correo) {
            document.getElementById("errorRepetirCorreo").style.display="none";
            document.getElementById("errorRepetirCorreo").textContent="";
            return true;
        }else{
            validar=false;
            document.getElementById("errorRepetirCorreo").style.display="inline-block";
            document.getElementById("errorRepetirCorreo").textContent="❌Los correos electrónicos no coinciden.";
            return false;
        }
    }


    //Validar número de teléfono
    function validarTelefono() {
        let telefono=document.getElementById("telefonoMovil").value;
        let formatoTelefono=/^[6789]\d{8,}$|^\+\d{8,}$/;

        if (telefono=="") {
            document.getElementById("errorTelefono").style.display="inline-block";
            document.getElementById("errorTelefono").textContent="❌Debe rellenar el campo Teléfono movil.";
            return false;
        } else if(telefono.length<9){
            document.getElementById("errorTelefono").style.display="inline-block";
            document.getElementById("errorTelefono").textContent="❌El teléfono debe tener al menos 9 carácteres.";
            return false;
        }else{
            if (!formatoTelefono.test(telefono)) {
                document.getElementById("errorTelefono").style.display="inline-block";
                document.getElementById("errorTelefono").textContent="❌El teléfono debe comenzar por 6,7,8,9 y puede incluir +.";
                return false;
            }else{
                document.getElementById("errorTelefono").style.display="none";
                document.getElementById("errorTelefono").textContent="";
                return true;
            }
        }   
    }

    //Validar las checkbox declaraciones
    function validarDeclaraciones() {
        let aceptar1=document.getElementById("declaraciones1").checked;
        let aceptar2=document.getElementById("declaraciones2").checked;

        if (!aceptar1||!aceptar2) {
            document.getElementById("errorDeclaraciones").style.display="inline-block";
            document.getElementById("errorDeclaraciones").textContent="❌Debe dar su consentimiento, en el apartado DECLARACIONES, al tratamiento de sus datos de carácter personal.";
            return false;
        }else{
            document.getElementById("errorDeclaraciones").style.display="none";
            document.getElementById("errorDeclaraciones").textContent="";
            return true;
        }   
    }

    //Para confirmar si se quiere envíar el formulario
    function confirmarEnvio() {
        return confirm("¿Estás seguro de que quieres enviar el formulario?");
    }
