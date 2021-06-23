
const getTopics = async () => {
    let ans = null;
    await fetch("/topics")
        .then(r => r.json())
        .then(d => ans = d)
        .catch(() => console.log("Error /topics"));
    return ans;
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

export {
    getTopics,
    getSuscriptors,
    addTopic,
    deleteTopic,
    subscribeEmail,
}