export default class AddTopic {
    constructor() {
        this.new_topic = document.querySelector("form#new-topic")

    }

    setCallback(addTopic) {
        const ipt_topic = this.new_topic.querySelector("input");
        this.new_topic.querySelector("button").onclick = async (e) => {
            e.preventDefault();
            const topicName = ipt_topic.value;
            await addTopic(topicName);
        }
    }

}