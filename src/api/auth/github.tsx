import axios from "axios";

export function handleGithubLogin() {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const callbackURL = process.env.GITHUB_CALLBACK;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${callbackURL}`;

}

