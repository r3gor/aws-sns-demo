import { getSuscriptors } from "../helpers.js";

export default class SubscribersList {
    constructor() {
        this.topic_suscriptors = document.querySelector("#topic-view #topic-suscriptors");
        // this.topic_suscriptors.classList.add("animate__animated animate__fadeIn");
        // this.topic_suscriptors.classList.add("animate__animated animate__fadeIn");
    }

    async render(topicArn) {
        const { Subscriptions } = await getSuscriptors(topicArn);
        const html = Subscriptions.map(({ Endpoint, SubscriptionArn }) => `
            <li class="animate__animated animate__fadeIn">
            ${Endpoint}
            ${SubscriptionArn === "PendingConfirmation" ?
                '(Confirmación Pendiente)' : ''
            }
            </li>
        `
        ).reduce((acc, item) => acc + item, '');

        this.topic_suscriptors.innerHTML = html;
    }
}