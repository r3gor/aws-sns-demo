import { getSuscriptors } from "../helpers.js";

export default class SubscribersList {
    constructor() {
        this.topic_suscriptors = document.querySelector("#topic-view #topic-suscriptors");
        // this.topic_suscriptors.classList.add("animate__animated animate__fadeIn");
        // this.topic_suscriptors.classList.add("animate__animated animate__fadeIn");
    }

    async render(topicArn) {
        const { Subscriptions } = await getSuscriptors(topicArn);
        let checkSubs = false;
        let html = Subscriptions.length == 0 ?
            `
            <div class="alert alert-danger" role="alert">
                No existen suscriptores en este tópico. <br/>
                ¡Agregue al menos una antes de sortear!
            </div>
            `
            :
            Subscriptions.map(({ Endpoint, SubscriptionArn }) => {
                if (SubscriptionArn !== "PendingConfirmation") checkSubs = true;
                return `
                    <li class="animate__animated animate__fadeIn">
                    ${Endpoint}
                    ${SubscriptionArn === "PendingConfirmation" ?
                        '(Confirmación Pendiente)' : ''
                    }
                    </li>
                `
            }).reduce((acc, item) => acc + item, '');

        if (!checkSubs && Subscriptions.length != 0) {
            html += `
            <br/>
            <div class="alert alert-danger" role="alert">
                No existen suscriptores confirmados en este tópico. <br/>
                ¡Espere al menos una antes de sortear!
            </div>
            `
        }

        this.topic_suscriptors.innerHTML = html;
    }
}