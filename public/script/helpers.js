
const getTopics = async () => {
    let ans = null;
    await fetch("/topics")
        .then(r => r.json())
        .then(d => ans = d)
        .catch(() => console.log("Error /topics"));
    return ans;
}

const getHostname = async () => {
    let hostname = null;
    await fetch("/hostname")
        .then(r => r.json())
        .then(d => hostname = d.hostname)
        .catch(() => console.log("Error /hostname"));
    return hostname;
}

const getPublicIp = async () => {
    let public_ip = null;
    await fetch("/public_ip")
        .then(r => r.json())
        .then(d => public_ip = d.public_ip)
        .catch(() => console.log("Error /public_ip"));
    return public_ip;
}

const getSuscriptors = async (TopicArn) => {
    let ans = null;
    await fetch(`/topics/${TopicArn}/suscribers`)
        .then(r => r.json())
        .then(d => ans = d)
        .catch(() => console.log("Error //topic/:TopicArn/suscribers"));
    return ans;
}

const addTopic = async (topicName) => {
    await fetch("/topics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({ topicName })
    })
        .then(res => res.json())
        .then(console.log);
}

const deleteTopic = async (TopicArn) => {
    await fetch("/topics", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({ TopicArn })
    })
        .then(res => res.json())
        .then(console.log);
}

const subscribeEmail = async ({ arn, Endpoint }) => {
    await fetch(`/topics/${arn}/suscribers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({ Endpoint })
    })
        .then(res => res.json())
        .then(console.log);
}

const publishToTopic = async ({ arn, Message }) => {
    await fetch(`/topics/${arn}/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({ Message })
    })
        .then(res => res.json())
        .then(console.log);
}

export {
    getHostname,
    getPublicIp,
    getTopics,
    getSuscriptors,
    addTopic,
    deleteTopic,
    subscribeEmail,
    publishToTopic,
}