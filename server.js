import Express from "express";
import * as path from 'path';
import { listTopics, listSubscriptionsByTopic, createTopic, deleteTopic, } from './sns_helpers.js'

const app = Express();
const port = 3000;

app.use(Express.static("public"));
app.use(Express.json());

app.get("/", async (req, res) => {
    res.sendFile(path.resolve('index.html'))
})

app.get("/topics", async (req, res) => {
    const { Topics } = await listTopics()
    res.json(Topics);
})

app.get("/topics/:index/suscribers", async (req, res) => {
    const { params: { index } } = req
    const { Topics } = await listTopics()
    const { TopicArn } = Topics[index]

    const params = { TopicArn }; //TOPIC_ARN

    const s = await listSubscriptionsByTopic(params);

    res.json(s);
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

app.listen(port, () => console.log("Listening on port " + port));