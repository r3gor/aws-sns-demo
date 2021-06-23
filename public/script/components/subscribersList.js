import { getSuscriptors } from "../helpers.js";

export default class SubscribersList {
    constructor() {
        this.topic_suscriptors = document.querySelector("#topic-view #topic-suscriptors");

    }

    async render(topicArn) {
        // SubscriptionArn: "PendingConfirmation"
        const { Subscriptions } = await getSuscriptors(topicArn);
        // debugger;
        const html = Subscriptions.map(({ Endpoint, SubscriptionArn }) => `
            <li>
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