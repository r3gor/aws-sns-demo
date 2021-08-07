import { fireAuth, fireDatabase } from "./firebaseconfig";

export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export async function googleLogin(setCurrentUser) {

    var provider = new fireAuth.GoogleAuthProvider();

    console.log("Google login...")

    await fireAuth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;

            console.log(user);
            console.log(token);

            // Set state
            setCurrentUser(user);

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

            console.error(errorCode);
            console.error(errorMessage);
            console.error('email:', email);
            console.error('credential: ', error.credential);
        });
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('current_user'));
}

export function isEmpty(obj) {
    return (
    // because Object.keys(new Date()).length === 0;
    // we have to do some additional check
    obj // 👈 null and undefined check
    && Object.keys(obj).length === 0 && obj.constructor === Object
    )
}

export async function validateVote(email, voteId){
    let valid = true;
    await fireDatabase.ref(`/vote/${voteId}/voters/${email.split("@")[0]}`)
        .get()
        .then(snapshot => {
            valid = (!snapshot.exists() || snapshot.val()==-1)? true : false;
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

    var updates = {};
    
    switch (action) {
        case 'increment':
            updates[`/vote/${voteId}/data/${bandIndex}/votes/`] = parseInt(prevVotes) + 1;            
            break;
        case 'decrement':
            updates[`/vote/${voteId}/data/${bandIndex}/votes/`] = parseInt(prevVotes) - 1;            
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