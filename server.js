import Express from "express";
import * as path from 'path';
import morgan from "morgan";
import { listTopics, listSubscriptionsByTopic, createTopic, deleteTopic, subscribeEmail, publishToTopic, } from './sns_helpers.js'

const app = Express();
const port = 3000;

app.use(Express.static("public"));
app.use(Express.json());
app.use(morgan('tiny'))

app.get("/", async (req, res) => {
    res.sendFile(path.resolve('index.html'))
})

app.get("/topics", async (req, res) => {
    const { Topics } = await listTopics()
    res.json(Topics);
})

app.post("/topics", async (req, res) => {
    const { topicName } = req.body

    const params = { Name: topicName };

    const data = await createTopic(params);

    res.json(data);
})

app.delete("/topics", async (req, res) => {
    const { TopicArn } = req.body;
    console.log(req.body);
    console.log(TopicArn);

    const params = { TopicArn };

    const data = await deleteTopic(params);

    res.json(data);
})

app.get("/topics/:TopicArn/suscribers", async (req, res) => {
    const { params: { TopicArn } } = req

    const params = { TopicArn }; //TOPIC_ARN
    console.log(params);

    const s = await listSubscriptionsByTopic(params);
    res.json(s);
})

app.post("/topics/:TopicArn/suscribers", async (req, res) => {
    const { Endpoint } = req.body;
    const { TopicArn } = req.params;

    const params = {
        Protocol: "email",
        TopicArn, //TOPIC_ARN
        Endpoint, //EMAIL_ADDRESS
    };

    console.log(params);

    const s = await subscribeEmail(params);
    res.json(s);
})

app.post("/topics/:TopicArn/message", async (req, res) => {
    const { Message } = req.body;
    const { TopicArn } = req.params;

    const params = {
        Message,
        TopicArn, //TOPIC_ARN
    };

    console.log(params);

    const s = await publishToTopic(params);
    res.json(s);
})

app.listen(port, () => console.log("Listening on port " + port));