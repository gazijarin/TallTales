import ENV from './../../config.js';

const API_HOST = ENV.api_host;
const log = console.log

export const checkSession = (app) => {
    const url = `${API_HOST}/users/check-session`;

    fetch(url)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .then(json => {
        if (json && json.currentUser) {
            app.setState({ currUser: json.currentUser });
        }
    })
    .catch(err => {
        log(err);
    });
}