function sortear() {
    //Obtener los suscriptores del DOM para no tener que solicitar
    //Nuevamente a AWS
    lista = document.querySelectorAll("#topic-suscriptors li");
    suscriptores = [];
    contenidoTexto = "";
    lista.forEach(nodo => {
        const email = nodo.textContent.split("\n")[1].trim();
        const confirmed = nodo.textContent.split("\n")[2].trim();
        if (confirmed !== "(Confirmación Pendiente)") {
            suscriptores.push(email);
        }
    });

    console.log("Sortear entre: ");
    console.log(suscriptores);

    if (suscriptores.length == 0) return;

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

