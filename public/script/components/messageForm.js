import { publishToTopic } from "../helpers.js";

export default class MessageForm {

    constructor() {
        this.form = document.querySelector("#topic-message");
        this.asunto = this.form.querySelector("#topic-message-asunto");
        this.mensaje = document.querySelector("#topic-message-mensaje");
        this.send = document.querySelector("#topic-message-send");
        this.arn = null;
    }

    setARN(arn) {
        this.arn = arn;
    }

    reset() {
        this.asunto.value = "";
        this.mensaje.innerHTML = "";
    }

    setCallback() {
        this.send.onclick = async (e) => {
            e.preventDefault();
            const asunto = this.asunto.value;
            const mensaje = this.mensaje.value;
            const message = `
------------------ ${asunto} ---
Mensaje:

    ${mensaje}

------------------ ${asunto} ---
. atte. LoteryFISI
            `
            console.log(message);
            const d = await publishToTopic({ arn: this.arn, Message: message });
            await publishToTopic({ arn: "arn:aws:sns:us-east-1:440279771614:Ganadores", Message: message }); // Trello
            console.log(d);

            this.reset();

            document.querySelector("#success-msg").style.display = "block";
            document.querySelector("#success-msg").innerHTML = `
            <div class="alert alert-success animate__animated animate__pulse text-center" role="alert">
                Mensaje enviado! (Asunto: ${asunto})
            </div>
            `
        }
    }
}