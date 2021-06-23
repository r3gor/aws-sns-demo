// Import required AWS SDK clients and commands for Node.js
import {
    CreateTopicCommand,
    GetTopicAttributesCommand,
    ListSubscriptionsByTopicCommand,
    ListTopicsCommand,
    SubscribeCommand,
    DeleteTopicCommand,
} from "@aws-sdk/client-sns";
import { snsClient } from "./libs/snsClient.js";

// const params = { TopicArn: "TOPIC_ARN" }; //TOPIC_ARN
const deleteTopic = async (params) => {
    try {
        const data = await snsClient.send(new DeleteTopicCommand(params));
        // console.log("Success.", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err.stack);
    }
};

// const params = { Name: "Test_topic1406" }; //TOPIC_NAME
const createTopic = async (params) => {
    try {
        const data = await snsClient.send(new CreateTopicCommand(params));
        // console.log("Success.", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err.stack);
    }
};


// const params = { TopicArn: "arn:aws:sns:us-east-1:440279771614:Test_topic1406" }; // TOPIC_ARN
const GetTopicAttributes = async (params) => {
    try {
        const data = await snsClient.send(new GetTopicAttributesCommand(params));
        // console.log("Success.", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err.stack);
    }
};


// const params = { TopicArn: "arn:aws:sns:us-east-1:440279771614:Test_topic1406" }; //TOPIC_ARN
const listSubscriptionsByTopic = async (params) => {
    try {
        const data = await snsClient.send(new ListSubscriptionsByTopicCommand(params));
        // console.log("Success.", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err.stack);
    }
};


const listTopics = async () => {
    try {
        const data = await snsClient.send(new ListTopicsCommand({}));
        // console.log("Success.", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err.stack);
    }
};



// const params = {
//     Protocol: "email" /* required */,
//     TopicArn: "arn:aws:sns:us-east-1:440279771614:Test_topic1406", //TOPIC_ARN
//     Endpoint: "yihsic@gmail.com", //EMAIL_ADDRESS
// };
const subscribeEmail = async (params) => {
    try {
        const data = await snsClient.send(new SubscribeCommand(params));
        // console.log("Success.", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err.stack);
    }
};

export {
    listTopics,
    listSubscriptionsByTopic,
    createTopic,
    deleteTopic,
    subscribeEmail,
    GetTopicAttributes,
}