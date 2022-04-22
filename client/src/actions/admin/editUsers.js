import { changeName } from "../editProfile/editProfile";
import ENV from './../../config.js';
import { errorToast, successToast } from "../../actions/toastify/toastify.js";

const API_HOST = ENV.api_host;
const log = console.log

export const editUser = (page, params) => {
    const field = params.field;
    const user = page.state.rows[params.id];
    const users = page.state.rows;
    log(params)

    switch(field) {
        case "username": 
            overRideUsername(undefined, user, users, params.id, page);
            break;
        default: 
            return;
    }
}

function overRideUsername(name, user, users, index, page) {
    if (name === "") {
        errorToast("username can't be blank!");
        return;    
    }

    const username = user.username;

    const newUser = {
        "username": name
    };

    const url = `${API_HOST}/users/edit/username/${username}`;

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newUser),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
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
            users.splice(index, 1, result);
            page.setState({
                rows: users
            });
            successToast('Username updated');
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

function deletedUser(users, user) {
    const newUsers = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].username !== user.username)
        newUsers.push({
            id: i,
            username: users[i].username,
            isAdmin: users[i].admin
        });
    }

    return newUsers;
}

function parseUsers(users) {
    const newUsers = [];
    for (let i = 0; i < users.length; i++) {
        newUsers.push({
            id: i,
            username: users[i].username,
            isAdmin: users[i].admin
        });
    }

    return newUsers;
}

export const getUsers = (page) => {
    const url = `${API_HOST}/users`;

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
            page.setState({
                rows: parseUsers(result)
            });
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

export const resetPass = (user) => {
    const newUser = {
        "password": "password"
    }

    const url = `${API_HOST}/users/edit/password/${user}`;

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newUser),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
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
            successToast(`${user}'s Password has been reset to: Password`);
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

export const deleteUser = (user, page) => {
    const url = `${API_HOST}/users/user/${user}`;

    const request = new Request(url, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
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
            page.setState({
              rows: deletedUser(page.state.rows, result)
            });
            successToast(`${user} has been deleted.`);
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