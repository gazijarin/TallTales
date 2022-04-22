import ENV from './../../config.js';
import { errorToast } from '../toastify/toastify.js';

const API_HOST = ENV.api_host;
const log = console.log

export const getUser = (page, app) => {
    const currUser = app.state.currUser;

    const url = `${API_HOST}/users/user/${currUser}`;

    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else {
            return res.text();
        }
    })
    .then((result) => {
        if (typeof(result) === 'object') {
            // log(page);
            page.setState({
                user: result
            });
            // log('updated')
            return;
        }
        else {
            errorToast(result);
            return;
        }
    })
    .catch(err => {
        log(err);
    })
}

export const getCurrentUser = (app, index) => {
    const currUser = app.state.currUser;
    const users = app.state.users;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === currUser) {
            if (index !== undefined) {
                return i;
            }
            else {
                return users[i];
            }
        }
    }
}