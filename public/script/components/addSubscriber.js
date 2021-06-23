export default class AddSubscriber {
    constructor() {
        this.topic_suscribe = document.querySelector("#topic-view #topic-suscribe");
    }

    setCallback(callback) {
        const sbt = this.topic_suscribe.querySelector("button");
        // debugger;
        const ipt = this.topic_suscribe.querySelector("input");
        sbt.onclick = (e) => {
            e.preventDefault();
            const email = ipt.value
            console.log("Add: " + ipt.value)
            callback(email);
        }
    }

}