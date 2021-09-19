const user_card = document.getElementById('user-card');
const drawUserCard = (user) => {
    //debugger;
    const { displayName, email, phoneNumber, photoURL, uid } = user;
    user_card.innerHTML = `
                <img src="${photoURL}" class="card-img-top" alt="google profile photo">
                <div class="card-body m-2">
                    <h5 class="card-title">${displayName}</h5>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <code>email: </code>
                            <div class="card-text">${email}.</div>
                        </li>
                        <li class="list-group-item">
                            <code>phone: </code>
                            <div class="card-text">phoneNumber: ${phoneNumber}.</div>
                        </li>
                        <li class="list-group-item">
                            <code>uid: </code>
                            <div class="card-text">${uid}.</div>
                        </li>
                    </ul>
                </div>
                    `;
}

const googleLogin = () => {

    var provider = new fireauth.GoogleAuthProvider();

    console.log("Google login...")

    fireauth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            console.log(user)
            console.log(token)

            drawUserCard(user)

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            console.error(errorCode);
            console.error(errorMessage);
            console.error('email:', email);
            console.error('credential: ', error.credential);
        });
}

const google_login = document.querySelector('#google-login');
google_login.onclick = googleLogin;
