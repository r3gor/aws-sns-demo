import { getSuscriptors, subscribeEmail } from "../helpers.js"
import { getName } from "../utils.js"
import AddSubscriber from "./addSubscriber.js"
import SubscribersList from "./subscribersList.js"

export default class TopicView {
    constructor() {
        this.topic_view = document.querySelector("#topic-view");
        this.topic_title = this.topic_view.querySelector("#topic-title");

        this.ARN = null;

        this.subscribers_list = new SubscribersList();
        this.add_subscriber = new AddSubscriber();

        this.add_subscriber.setCallback((Endpoint) => this.addNewSubscriber(Endpoint));

        // this.topic_message = this.topic_view.querySelector("#topic-message")
    }

    async render(topicArn) {

        this.ARN = topicArn;

        this.topic_view.style.display = "";
        this.topic_title.innerText = getName(topicArn);

        await this.subscribers_list.render(topicArn);
    }

    async addNewSubscriber(Endpoint) {
        await subscribeEmail({ arn: this.ARN, Endpoint })
        this.subscribers_list.render(this.ARN);
    }
}