import TopicTable from './components/topicTable.js';
import AddTopic from './components/addTopic.js';
import {
    addTopic,
    deleteTopic,
    getSuscriptors,
    getTopics
} from './helpers.js';
import TopicView from './components/topicView.js';

export default class View {
    constructor() {
        const topic_view = document.querySelector("#topic-view")
        topic_view.style.display = "none";

        this.topic_view = new TopicView();
        this.topic_table = new TopicTable();
        this.add_topic = new AddTopic();

        this.topic_table.setCallbacks({
            deleteTopic: async (arn) => await this.deleteATopic(arn),
            selectTopic: (arn) => this.selectTopic(arn),
        });
        this.add_topic.setCallback(async (topicName) => await this.addNewTopic(topicName));
    }

    async render() {
        await this.topic_table.render();
    }

    selectTopic(arn) {
        console.log("Select ARN: " + arn);
        this.topic_view.render(arn);
    }

    async addNewTopic(topicName) {
        await addTopic(topicName);
        await this.topic_table.render();
    }

    async deleteATopic(arn) {
        await deleteTopic(arn);
        await this.topic_table.render();
    }
}