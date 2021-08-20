import Express from "express";
import ejs from "ejs";
import * as path from 'path';
import morgan from "morgan";
import os from 'os';
import publicIp from 'public-ip';
import { listTopics, listSubscriptionsByTopic, createTopic, deleteTopic, subscribeEmail, publishToTopic, } from './sns_helpers.js'

const app = Express();
const port = 3000;

app.use(Express.static("public"));
app.use(Express.json());
app.use(morgan('tiny'))

app.get("/", async (req, res) => {
    // res.sendFile(path.resolve('index.html'))
    const data = {public_ip: await publicIp.v4()};
    ejs.renderFile(path.resolve('index.html'), { data }, (err, html) => {
        res.send(html);
    });
})

// app.get("/hostname", async (req, res) => {
//     console.log("HOSTNAME: ", os.hostname())
//     res.json({
//         hostname: os.hostname(),
//     })
// })

// app.get("/public_ip", async (req, res) => {
//     console.log("HOSTNAME: ", os.hostname())
//     res.json({
//         public_ip: await publicIp.v4(),
//     })
// })

app.get("/topics", async (req, res) => {
    const { Topics } = await listTopics()

    res.json({
        data: Topics,
        public_ip: await publicIp.v4(),
    });
})

app.post("/topics", async (req, res) => {
    const { topicName } = req.body

    const params = { Name: topicName };

    const data = await createTopic(params);

    res.json({
        data: data,
        public_ip: await publicIp.v4(),
    });
})

app.delete("/topics", async (req, res) => {
    const { TopicArn } = req.body;
    console.log(req.body);
    console.log(TopicArn);

    const params = { TopicArn };

    const data = await deleteTopic(params);

    res.json({
        data: data,
        public_ip: await publicIp.v4(),
    });
})

app.get("/topics/:TopicArn/suscribers", async (req, res) => {
    const { params: { TopicArn } } = req

    const params = { TopicArn }; //TOPIC_ARN
    console.log(params);

    const s = await listSubscriptionsByTopic(params);

    res.json({
        data: s,
        public_ip: await publicIp.v4(),
    });
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

    res.json({
        data: s,
        public_ip: await publicIp.v4(),
    });
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

    res.json({
        data: s,
        public_ip: await publicIp.v4(),
    });
})

app.listen(port, (err) => console.log("Listening on port " + port));