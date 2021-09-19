const send = document.querySelector('#btn-send');
const email = document.querySelector('#ipt-email');
const bio = document.querySelector('#ipt-bio');

const users = document.querySelector('#accordion-users')

send.onclick = () => {
    console.log(email.value);
    console.log(bio.value);

    writeData(email.value, bio.value);

    email.value = ''
    bio.value = ''
};

function writeData(email, biography) {
    // Create a new data reference with an auto-generated id
    var listRef = firebase.database().ref('app-data');
    var newItemRef = listRef.push();
    newItemRef.set({
        email,
        biography,
    });
}

var dataRef = firebase.database().ref('app-data');
dataRef.on('value', (snapshot) => {
    const data = snapshot.val();
    // debugger;
    console.log(data);

    var html = '';
    console.log("Childs: ")
    snapshot.forEach((child) => {
        console.log(child.val());
        console.log(child.key);

        const { email, biography } = child.val();

        html += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading-${child.key}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${child.key}" aria-expanded="false" aria-controls="flush-collapse-${child.key}">
                    ${email}
                </button>
                </h2>
                <div id="flush-collapse-${child.key}" class="accordion-collapse collapse" aria-labelledby="flush-heading-${child.key}" data-bs-parent="#accordion-users">
                <div class="accordion-body">${biography}</div>
                </div>
            </div>
        `
        users.innerHTML = html;
    })
});