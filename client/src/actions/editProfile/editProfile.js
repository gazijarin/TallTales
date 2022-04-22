import ENV from './../../config.js';
import { getUser } from '../global/users.js';
import { errorToast, successToast } from "../../actions/toastify/toastify.js";

const API_HOST = ENV.api_host;
const log = console.log

export const changeName = (app, page) => {
    const newName = document.getElementById('change-username').value;
    const currUser = app.state.currUser;

    if (newName === "") {
        errorToast("username can't be blank!");
        return;    
    }

    const newUser = {
        "username": newName
    };

    const url = `${API_HOST}/users/edit/username/${currUser}`;

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
            app.setState({
              currUser: result.username
            });
            getUser(page, app);
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

export const changePassword = (app) => {
    const newPass = document.getElementById('change-password').value;
    const currUser = app.state.currUser;

    // log(currUser)

    if (newPass === "") {
        errorToast("password can't be blank!");
        return;    
    }

    const newUser = {
        "password": newPass
    }

    const url = `${API_HOST}/users/edit/password/${currUser}`;

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
            app.setState({
              currUser: result.username
            });
            successToast('Password updated');
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

export const changeAvatar = (users, app, page, avatar) => {
    const currUser = app.state.currUser;

    const newUser = {
        "icon": avatar
    }

    const url = `${API_HOST}/users/edit/avatar/${currUser}`;

    // log(currUser);

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
            app.setState({
              currUser: result.username
            });
            getUser(page, app);
            successToast('Avatar updated')
            // page.setState({
            //     user: result
            // })
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

export const prevAvatar = (avatar, page) => {
    const currAvatar =  avatar.charAt(7);
    let newAvatar;
    
    switch (currAvatar) {
        case '1':
            newAvatar = 4
            break;
        default: 
            newAvatar = parseInt(currAvatar) - 1
            break;
    }

    page.setState({
        avatar: "avatar0" + newAvatar + ".png"
    })
}

export const nextAvatar = (avatar, page) => {
    const currAvatar =  avatar.charAt(7);
    let newAvatar;
    
    switch (currAvatar) {
        case '4':
            newAvatar = 1
            break;
        default: 
            newAvatar = parseInt(currAvatar) + 1
            break;
    }

    page.setState({
        avatar: "avatar0" + newAvatar + ".png"
    })
}