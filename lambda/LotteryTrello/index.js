const fetch = require('node-fetch');

exports.handler = async (event, context) => {

    const message = event.Records[0].Sns.Message;
    console.log(message);

    const i = message.indexOf("¡");
    const f = message.indexOf("!");
    const email = message.slice(i + 15, f).trim();
    const sorteo = message.split(email)[2].split("Agradecemos")[0].split("sorteo")[1].trim();

    const url = `https://api.trello.com/1/cards?key=0f6f647bd51286a5a6ebb935d78b3120&token=1af54ae760e161b8eb9a3b1f8bf028e498e89dee2056768d55b99e2ade08b972&name=Sorteo: ${sorteo}&desc=Ganador: ${email}.&idList=60d64fa73ed8ad78cf4a21c0`
    console.log("URL:", url)
    
    await fetch(url, {
        method: 'POST'
    })
    .then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
}