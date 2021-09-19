import { fireAuth } from "../firebaseconfig";

export function getCurrentUser() {

    return JSON.parse(localStorage.getItem('current_user'));
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
            console.error('credential: ', credential);
        });
}