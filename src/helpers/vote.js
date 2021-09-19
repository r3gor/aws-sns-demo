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


export async function updateVotes(bandIndex, voteId, action){
    
    const snapshot = await fireDatabase.ref(`/vote/${voteId}/data/${bandIndex}/votes`).get()
    const oldVotesCount = snapshot.val();

    let updates = {};
    
    switch (action) {
        case 'increment':
            updates[`/vote/${voteId}/data/${bandIndex}/votes/`] = parseInt(oldVotesCount) + 1;            
            break;
        case 'decrement':
            updates[`/vote/${voteId}/data/${bandIndex}/votes/`] = parseInt(oldVotesCount) - 1;            
            break;
        default:
            console.log("updateVotes: Unknown action")
            break;
    }
    
    // update votes
    fireDatabase.ref().update(updates);
}


export async function saveVoter(email, voteId, index){
    // save voter
    fireDatabase.ref(`/vote/${voteId}/voters/${email.split("@")[0]}`).set(
        index
    );
}


export function idByEmail(email){
    return email.split("@")[0].replace('.', '*');
}