import TopicTable from './components/topicTable.js';
import AddTopic from './components/addTopic.js';
import {
    addTopic,
    deleteTopic,
    getSuscriptors,
    getTopics,
    getHostname
} from './helpers.js';
import TopicView from './components/topicView.js';

export default class View {
    constructor() {
        
        this.hostname_view = document.querySelector("#hostname")
        const topic_view = document.querySelector("#topic-view")
        // topic_view.style.display = "none";

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

        const hostname = await getHostname();

        this.hostname_view.innerHTML = `
        <div class="alert alert-success"> 
            Hostname es:
            <h4 class="alert-heading">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                ${hostname}
            </h4>
        </div>
        `
        
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