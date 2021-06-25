import { getSuscriptors, subscribeEmail } from "../helpers.js"
import { getName } from "../utils.js"
import AddSubscriber from "./addSubscriber.js"
import MessageForm from "./messageForm.js";
import SubscribersList from "./subscribersList.js"

export default class TopicView {
    constructor() {
        this.topic_view = document.querySelector("#topic-view");
        this.topic_title = this.topic_view.querySelector("#topic-title");

        this.ARN = null;

        this.subscribers_list = new SubscribersList();
        this.add_subscriber = new AddSubscriber();
        this.message_form = new MessageForm();

        this.add_subscriber.setCallback((Endpoint) => this.addNewSubscriber(Endpoint));

        // this.topic_message = this.topic_view.querySelector("#topic-message")
    }

    async render(topicArn) {

        this.ARN = topicArn;

        this.topic_view.style.display = "block";
        this.topic_title.innerHTML = `
        <h3 class="animate__animated animate__fadeInDown">
            Sorteo: <span id="titulo-sorteo-seleccionado"> ${getName(topicArn)} </span>
        </h3>
        `;

        this.message_form.setARN(this.ARN);
        this.message_form.setCallback();
        await this.subscribers_list.render(topicArn);
    }

    async addNewSubscriber(Endpoint) {
        await subscribeEmail({ arn: this.ARN, Endpoint })
        this.subscribers_list.render(this.ARN);
    }
}