
const table = document.querySelector("#sorteos-body")
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
                            <div class="container">
                                <button class="btn btn-primary m-2"data-idx=${i}>Seleccionar</button>
                                <button class="btn btn-danger m-2" data-idx=${i}>Borrar</button>
                            </div>
                        </td>
                    </tr>
                `
    }).reduce((acc, item) => acc + item)

    table.innerHTML = html;
}

renderTable()