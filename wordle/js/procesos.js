window.addEventListener("DOMContentLoaded", ()=>{
    //Guardamos la palabra con la que haremos que el usuario juegue
    let palabraParaAdivinar="";
    obtenerPalabra().then(palabra=>{
        palabraParaAdivinar=palabra;
    })

    let teclas=document.querySelectorAll(".tecla");
    let letras=document.querySelectorAll(".letra");
    
    //Para que en cuanto se entre en la página ya se pueda empezar a escribir sin necesidad de hacer click en el input
    letras[0].focus(); //focus sirve para colocarse en un input

    let tamañoPalabra=5;
    letras.forEach((letra,i)=>{
        //Para juntar todas las letras en una palabra
        letra.addEventListener("input", ()=>{
            let grupoLetras=i%tamañoPalabra;
            if (letra.value && grupoLetras<tamañoPalabra-1) {
                letras[i+1].focus();
            }
            let inicio=i-grupoLetras;
            let palabra=""; //la palabra final
            for(let j=inicio;j<inicio+tamañoPalabra;j++){
                palabra+=letras[j].value;
            }
        });
        //Para que al pulsar el backspace se vaya pasando de un input a otro
        letra.addEventListener("keydown", j=>{
            if (j.key=="Backspace") {
                if (letra.value!="") {
                    letra.value="";
                    j.preventDefault(); //evita que el Backspace borre más cosas
                    return; //termina el evento
                }
                //Si el input está vacío salta al anterior
                if (i>0) {
                    //Si el input anterior tiene alguna clase(está coloreado) no realiza ninguna acción, para evitar errores
                     if (letras[i-1].classList.length>1) { 
                        //es >1 y no >0 porque la clase letra está siempre
                        j.preventDefault();
                        return; //temina el evento
                    }
                    letras[i-1].focus();
                    letras[i-1].value="";
                    j.preventDefault();
                }
            }
        })
    });

    let inputActivo=letras[0]; 
    //Para poder escribir con el teclado creado en la página
    letras.forEach(input=>{ //recorre todos lo inputs y se ejecuta el evento cuando el input tiene el focus
        input.addEventListener("focus", () => {
            inputActivo=input;
        });
    });
    teclas.forEach(tecla=>{ //recorre todas las teclas y se ejecuta el evento cuando se hace click en una de ellas
        tecla.addEventListener("click",()=>{
            if (!inputActivo){
                return;
            }

            let teclaPulsada=tecla.dataset.key; //guarda el valor del atributo "data-key"(la letra que corresponde a la tecla)
            if (teclaPulsada=="RETROCESO") {
                inputActivo.dispatchEvent(new KeyboardEvent("keydown", {key: "Backspace"})); //llama a la tecla Backspace
                return;
            }
            if (teclaPulsada=="ENTER") {
                inputActivo.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" })); //llama a la tecla Enter
                return;
            }

            //Para que se escriba la letra en el input
            inputActivo.value=teclaPulsada;

            //Para mover al siguiente input automáticamente
            let index=[...letras].indexOf(inputActivo);
            if (index<letras.length-1) {
                letras[index+1].focus();
            }
        });
    });


    let ultimaLetraDelIntento=document.querySelectorAll(".ultimaLetra");
    //Al pulsar enter en la ultima letra y comprobar que esté todo correcto, se llama a la función para validar la palabra
    ultimaLetraDelIntento.forEach(input=>{
        input.addEventListener("keydown",(evento)=>{
            if (evento.key=="Enter") {
                //Antes de llamar a la función hay que comprobar que en el último input se haya introducido un valor,
                //porque es posible que se pueda envíar la palabra con este último input en blanco 
                let posicionInput=[...letras].indexOf(input);
                let inicioFila=posicionInput-(posicionInput%tamañoPalabra);

                let filaCompleta=true;
                for (let i = 0; i<tamañoPalabra; i++) {
                    if (letras[inicioFila + i].value=="") {
                        filaCompleta=false;
                        break;
                    }
                }

                if (!filaCompleta) {
                    alert("No hay suficientes letras.");
                    return;
                }

                // Si está completa, validar la palabra
                letrasAcertadas();
            }
        })
    })

    //Función para obtener la palabra con la que jugar
    function obtenerPalabra() {
        let urlAPI="https://random-word-api.herokuapp.com/word?number=1&length=5&lang=es"; 

        return fetch(urlAPI).then(response=>response.json()) //para convertirlo a JSON
        .then(palabraObtenida=>{
            console.log(palabraObtenida);
            return palabraObtenida[0];
        }).catch(error=>{
            console.log("Error al llamar la API:", error);
            return "GATOS"; //Si la API no funciona, la palabra por defecto para jugar es GATOS
        });
    }

    let intento=0;
    ecribirSoloEnIntento();
    
    //Función para comprobar las letras acertadas
    function letrasAcertadas() {
        let palabraCorrecta=palabraParaAdivinar.toUpperCase(); //convierte la palabra a adivinar en mayúsculas por si acaso
        let contLetrasAcertadas=0;

        let teclasAColorear=document.querySelectorAll('[data-key]'); //Variable que guarda todas las teclas

        let inicio=intento*tamañoPalabra;
        for (let i=0;i<tamañoPalabra;i++) {
            let input=letras[inicio + i];
            let letra=input.value.toUpperCase();

            //Variable que guarda la tecla que corresponde a la letra que esta recorriendo el bucle
            let teclaAColorear=Array.from(teclasAColorear).find(teclaSinColor=>teclaSinColor.dataset.key===letra);

            if (letra===palabraCorrecta[i]) {
                input.style.backgroundColor="rgb(69, 139, 69)";
                contLetrasAcertadas++;

                //Colorea la tecla en verde si la letra con la posición es acertada
                if (teclaAColorear) {
                    teclaAColorear.style.backgroundColor="rgb(69, 139, 69)";
                }
            } else if (letra!=="" && palabraCorrecta.includes(letra)) {
                input.style.backgroundColor="rgb(255, 187, 0)";

                //Colorea la tecla en amarillo si la letra es acertada pero la posición no
                if (teclaAColorear) {
                    teclaAColorear.style.backgroundColor="rgb(255, 187, 0)";
                }
            } else {
                input.style.backgroundColor="rgb(91, 91, 91)";

                //Colorea la tecla en gris oscuro si no se acierta la letra
                if (teclaAColorear) {
                    teclaAColorear.style.backgroundColor="rgba(44, 44, 44, 1)";                    
                }
            }
        }

        //Una vez introducido el intento, no deja volver a modificarlo
        for (let i = 0; i<tamañoPalabra; i++) {
            letras[inicio+i].disabled=true; //disabled bloquea los inputs
        }

        //En cuanto la palabra es acertada, muestra un mensaje
        if (contLetrasAcertadas==tamañoPalabra) {
            alert("¡Espléndido!");
            return;
        } 

        //Si después de todos los intentos no se ha encontrado la palabra, muestra un mensaje
        if (intento>4) {
            alert("Lo sentimos, no ha encontrado la palabra. Era: "+palabraParaAdivinar);
        }

        intento++;
        ecribirSoloEnIntento();

        //Al terminar el intento se pasa al siguiente input sin necesidad de hacer click en el
        if (letras[intento*tamañoPalabra]) {
            letras[intento*tamañoPalabra].focus(); //focus apunta a un input específico
            inputActivo=letras[intento*tamañoPalabra];
        }

    }

    //Función para que el usuario solamente pueda escribir en el intento activo en ese momento
    function ecribirSoloEnIntento() {
        //Comprobar que las letras existan
        if (!letras||letras.length==0){
            return; 
        }

        //Para que solo se pueda escribir en el intento actual
        letras.forEach((input, i)=>{
            const fila=Math.floor(i/tamañoPalabra);
            input.disabled=(fila!=intento);
        });

        //Para hacer focus al primer input del intento actual
        const primerIndex=intento*tamañoPalabra;
        const primerInput=letras[primerIndex];
        if (primerInput) {
            primerInput.focus();
            inputActivo=primerInput;
        }
    }
});