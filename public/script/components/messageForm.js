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
            console.log(d);
        }
    }
}