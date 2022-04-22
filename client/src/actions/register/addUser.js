import ENV from './../../config.js';
import { errorToast, successToast } from "../../actions/toastify/toastify.js";

const API_HOST = ENV.api_host;
const log = console.log

export const addUser = (app, users) => {
    const currUserName = document.getElementById("user-name").value;
    const currPassword = document.getElementById("password").value;
    // numAvatars is used to randomly assign avatar in range avatar01 -> avatarnumAvatars
    const numAvatars = 4;

    if(currUserName === "") {
        errorToast("username is blank!");
        return;    
    }

    if(currPassword === "") {
        errorToast("password is blank!");
        return;
    }
    
    const newUser = {
        "username": currUserName,
        "password": currPassword,
        "icon": "avatar0" + (Math.ceil(Math.random() * (numAvatars))).toString() + ".png"
    }

    const url = `${API_HOST}/users/register`;

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
        // User added successfully
        if (res.status === 200) {
            // Go back to login page
            app.setState({
                page: "login"
            });
            successToast('User added!');
            return;
        }

        else {
            return res.text();
        }
    })
    .then((errMessage) => {
        errorToast(errMessage);
    })
    .catch(err => {
        log(err);
    })

    
}