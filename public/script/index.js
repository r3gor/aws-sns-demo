import View from './view.js'

const view = new View()
view.render();
// import {
//     addTopic,
//     deleteTopic,
//     getSuscriptors,
//     getTopics
// } from './helpers'


// const topic_view = document.querySelector("#topic-view")

// const topic_title = topic_view.querySelector("#topic-title")
// const topic_suscriptors = topic_view.querySelector("#topic-suscriptors")
// const topic_suscribe = topic_view.querySelector("#topic-suscribe")
// const topic_message = topic_view.querySelector("#topic-message")

// let topics = null;
// let suscriptors = null;

// const addActions = () => {
//     const ipt_topic = new_topic.querySelector("input")
//     new_topic.querySelector("button").onclick = async (e) => {
//         e.preventDefault();
//         const topicName = ipt_topic.value;
//         await addTopic(topicName);
//         render();
//     }


// }

// const renderTopicView = async (topicArn) => {
//     if (!topicArn) return;

//     topic_view.style.display = "";

//     console.log("select: " + topicArn);

//     topic_title.innerText = getName(topicArn);
//     await getSuscriptors(topicArn);
//     topic_suscriptors.innerText = JSON.stringify(suscriptors);
// }

// const render = async () => {
//     await renderTable();
//     addActions();
// }

// render();
// topic_view.style.display = "none";
