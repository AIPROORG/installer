import endpoints from "./utils/endpoints.js";
import storageComunicator from "./utils/storageComunicator.js";

let form_errors = document.getElementById("form_errors");
let form = document.getElementById("form");
let google_sign_in_btn = document.getElementById("google_sign_in_btn");


const REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT = 'http://localhost:5500';
const REACT_APP_GOOGLE_CLIENT_ID = "731150393378-4sr923k9j8f869bjmojt6pb9gr4mqa4s.apps.googleusercontent.com";
const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

const scope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/admin.directory.user",
    "https://www.googleapis.com/auth/admin.directory.user.readonly",
    "https://www.googleapis.com/auth/cloud-platform",
].join(" ");

const params = new URLSearchParams({
    response_type: "code",
    client_id: REACT_APP_GOOGLE_CLIENT_ID,
    redirect_uri: `${REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT}/auth.html`,
    prompt: "select_account",
    access_type: "offline",
    scope,
});



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let messages = [];

    if (email.value === '' || email.value === null) {
        messages.push('Email is required');
    }
    if (password.value === '' || password.value === null) {
        messages.push('Password is required');
    }
    if (password.value.length > 20) {
        messages.push('Password must be less than 20 characters');
    }
    if (password.value === 'password') {
        messages.push('Password cannot be password');
    }

    if (messages.length > 0) {
        form_errors.innerText = messages.join('\n');
    } else {
        form_errors.innerText = "all good";
        try {
            const response = await fetch(endpoints.login.basic.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
            });
            const data = await response.json();
            // save token to local storage
            storageComunicator.authToken.set(data);
            console.log(data);
        } catch (error) {
            console.error('Error during fetch operation:', error);
        }
    }
});


google_sign_in_btn.addEventListener('click', async () => {
    console.log("google sign in clicked");
    const url = `${googleAuthUrl}?${params}`;

    window.location.href = url;
});