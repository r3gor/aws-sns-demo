const table = document.querySelector("#sorteos-body")
const new_topic = document.querySelector("form#new-topic")

let topics = null

const loadTopics = async () => {
    await fetch("/topics")
        .then(r => r.json())
        .then(d => topics = d)
        .catch(() => console.log("Error /topics"));
}

const renderTable = async () => {
    await loadTopics();

    const html = topics.map((topic, i) => {
        const name = topic.TopicArn.split(":").slice(-1)[0];
        return `
                    <tr>
                        <td>${name}</td>
                        <td>
                            <div class="btns container" data-arn=${topic.TopicArn}>
                                <button class="btn btn-primary m-2"data-idx=${i}>Seleccionar</button>
                                <button class="btn btn-danger m-2" data-idx=${i}>Borrar</button>
                            </div>
                        </td>
                    </tr>
                `
    }).reduce((acc, item) => acc + item)

    table.innerHTML = html;
}

const render = async () => {
    await renderTable();
    addActions();
}

const addActions = () => {
    const ipt_topic = new_topic.querySelector("input")
    new_topic.querySelector("button").onclick = async (e) => {
        e.preventDefault();
        const topicName = ipt_topic.value;
        await fetch("/topics", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ topicName })
        })
            .then(res => res.json())
            .then(console.log);

        render();
    }

    Array.from(table.querySelectorAll("button.btn-danger")).map((btn => {
        btn.onclick = async (e) => {
            e.preventDefault();
            // debugger;
            const arn = e.target.parentElement.dataset.arn;
            await fetch("/topics", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({ TopicArn: arn })
            })
                .then(res => res.json())
                .then(console.log);

            render();
        }
    }))

    Array.from(table.querySelectorAll("button.btn-primary")).map((btn => {
        btn.onclick = async (e) => {
            e.preventDefault();
            const arn = e.target.parentElement.dataset.arn;

        }
    }))
}

render();