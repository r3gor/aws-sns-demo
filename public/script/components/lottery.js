function sortear() {
    debugger;
    //Obtener los suscriptores del DOM para no tener que solicitar
    //Nuevamente a AWS
    lista = document.querySelectorAll("#topic-suscriptors li");
    suscriptores = [];
    contenidoTexto = "";
    lista.forEach(nodo => {
        contenidoTexto = nodo.textContent;
        contenidoTexto = contenidoTexto.slice(13, -26);
        suscriptores.push(contenidoTexto.trim())
    });

    //Realización del sorteo
    do {
        elegido = Math.random() * (suscriptores.length);
    } while (elegido == suscriptores.length);

    elegido = Math.floor(elegido);
    //console.log("El ganador es " + suscriptores[elegido]);

    //Colocar mensaje
    asunto = document.querySelector("#topic-message-asunto");
    mensaje = document.querySelector("#topic-message-mensaje");
    titulo = document.querySelector("#titulo-sorteo-seleccionado");

    // asunto.setAttribute("value", "¡Felicitaciones " + suscriptores[elegido].trim() + "!");
    asunto.value = "¡Felicitaciones " + suscriptores[elegido].trim() + "!";

    mensaje.innerHTML = "¡Felicitaciones " + suscriptores[elegido].trim() + "! " +
        "por haber sido el ganador del sorteo " + titulo.textContent.trim() + ".\n" +
        "Agradecemos a todos por participar.";
}

