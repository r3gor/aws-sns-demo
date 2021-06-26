import { getName } from '../utils.js'
import { getTopics } from '../helpers.js'

export default class TopicTable {
    constructor() {
        this.table = document.querySelector("#sorteos-body");
    }

    setCallbacks(callbacks) {
        this.callbacks = callbacks;
    }

    async render() {
        const privates = [
            "AWS_FreeTierAlarm",
            "Ganadores",
        ]
        let topics = await getTopics()
        topics = topics.filter(({ TopicArn }) => !(privates.includes(getName(TopicArn))));
        const html = topics.map((topic, i) => {
            const name = getName(topic.TopicArn);
            return `
                    <tr class="animate__animated animate__fadeIn">
                        <td>${name}</td>
                        <td>
                            <div class="btns container" data-arn=${topic.TopicArn}>
                                <button class="btn btn-primary far fa-hand-point-left m-2"data-idx=${i}>
                                </button>
                                <button class="btn btn-danger far fa-trash-alt m-2" data-idx=${i}>
                                </button>
                            </div>
                        </td>
                    </tr>
                `
        }).reduce((acc, item) => acc + item, '');

        this.table.innerHTML = html;

        // --- actions

        const { deleteTopic, selectTopic } = this.callbacks;

        // --- delete topic

        Array.from(this.table.querySelectorAll("button.btn-danger")).map((btn => {
            btn.onclick = async (e) => {
                e.preventDefault();
                const arn = e.target.parentElement.dataset.arn;
                await deleteTopic(arn);
                document.querySelector("#topic-view").style.display = "none";
            }
        }))

        // --- select topic

        Array.from(this.table.querySelectorAll("button.btn-primary")).map((btn => {
            btn.onclick = async (e) => {
                e.preventDefault();
                const arn = e.target.parentElement.dataset.arn;
                await selectTopic(arn);
            }
        }))
    }
}