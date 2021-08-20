
// function logPublicIP(public_ip, petition="") {
//     // console.warn(public_ip, petition);
//     console.log(`%c${public_ip} %c${petition}`, 'background: black; color: aqua;', 'background: black; color: chartreuse;');
//     document.querySelector("#public_ip").innerHTML = `
//     <div class="alert alert-primary animate__animated animate__pulse"> 
//         <strong> ${petition} </strong>
//         <br/>
//         IP Pública del servidor:
//         <h4 class="alert-heading">
//             <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
//             ${public_ip}
//         </h4>
//     </div>
//     ` 
// }

import { getColorInstance } from "./utils.js";


function logPublicIP(public_ip, petition="") {
    console.log(
        `%c${public_ip} %c${petition}`, 
        `background: black; color: ${getColorInstance(public_ip)};`, 
        'background: black; color: chartreuse;'
        );
    document.querySelector("#public_ip").innerHTML = `
    <div class="alert alert-primary animate__animated animate__pulse"> 
        La última petición se realizó al servidor con dirección IP pública:
        <h4 class="alert-heading">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
            ${public_ip}
        </h4>
    </div>
    ` 
}


const getTopics = async () => {
    let ans = null;
    await fetch("/topics")
        .then(r => r.json())
        .then(d => ans = d)
        .catch(() => console.log("Error /topics"));
    logPublicIP(ans.public_ip, "GET /topics")
    return ans.data;
}

// const getHostname = async () => {
//     let hostname = null;
//     await fetch("/hostname")
//         .then(r => r.json())
//         .then(d => hostname = d.hostname)
//         .catch(() => console.log("Error /hostname"));
//     return hostname;
// }

// const getPublicIp = async () => {
//     let public_ip = null;
//     await fetch("/public_ip")
//         .then(r => r.json())
//         .then(d => public_ip = d.public_ip)
//         .catch(() => console.log("Error /public_ip"));
//     return public_ip;
// }

const getSuscriptors = async (TopicArn) => {
    let ans = null;
    await fetch(`/topics/${TopicArn}/suscribers`)
        .then(r => r.json())
        .then(d => ans = d)
        .catch(() => console.log("Error //topic/:TopicArn/suscribers"));
    logPublicIP(ans.public_ip, `GET /topics/${TopicArn}/suscribers`)
    return ans.data;
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
        .then(data => {
            // console.log(data)
            logPublicIP(data.public_ip, `POST /topics`)
        });
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
        .then(data => {
            // console.log(data)
            logPublicIP(data.public_ip, `DELETE /topics`)
        });
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
        .then(data => {
            // console.log(data)
            logPublicIP(data.public_ip, `POST /topics/${arn}/suscribers`)
        });
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
        .then(data => {
            // console.log(data)
            logPublicIP(data.public_ip, `POST /topics/${arn}/message`)
        });
}

export {
    // getHostname,
    // getPublicIp,
    getTopics,
    getSuscriptors,
    addTopic,
    deleteTopic,
    subscribeEmail,
    publishToTopic,
}