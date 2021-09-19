import { fireDatabase } from "../firebaseconfig";


export async function createVote(voteName, bandsData, bandsQuantity){
    const voteData = bandsData.slice(0, bandsQuantity);
    console.log("send to firebase: ");
    console.log(voteData);
    var newItemRef = fireDatabase.ref('vote').push();
    newItemRef.set({
        name: voteName,
        data: { ...voteData },
    });
}

export async function validateVote(email, voteId){
    let valid = true;
    await fireDatabase.ref(`/vote/${voteId}/voters/${email.split("@")[0]}`)
        .get()
        .then(snapshot => {
            valid = (!snapshot.exists() || snapshot.val()===-1)? true : false;
        })
    return valid;
}

export async function updateVotes(bandIndex, voteId, action){
    let prevVotes;
    await fireDatabase.ref(`/vote/${voteId}/data/${bandIndex}/votes`)
        .get()
        .then((snapshot) => {
            prevVotes = snapshot.val();
        })

    let updates = {};
    
    switch (action) {
        case 'increment':
            updates[`/vote/${voteId}/data/${bandIndex}/votes/`] = parseInt(prevVotes) + 1;            
            break;
        case 'decrement':
            updates[`/vote/${voteId}/data/${bandIndex}/votes/`] = parseInt(prevVotes) - 1;            
            break;
        default:
            console.log("Unknown action")
            break;
    }
    
    // update votes
    fireDatabase.ref().update(updates);
}

export async function getBandIndexOfVote(email, voteId){
    let index = -1;
    await fireDatabase.ref(`/vote/${voteId}/voters/${email.split("@")[0]}`)
        .get()
        .then(snapshot => {
            if (snapshot.exists())
                index = snapshot.val();
        })
    return index;
}

export async function saveVoter(email, voteId, index){
    // save voter
    fireDatabase.ref(`/vote/${voteId}/voters/${email.split("@")[0]}`).set(
        index
    );
}

// "sad*sada.dsad".replace(/[*.]/g,'');

export function idByEmail(email){
    return email.split("@")[0].replace('.', '*');
}