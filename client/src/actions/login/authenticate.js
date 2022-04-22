import ENV from './../../config.js';
import { errorToast } from "../../actions/toastify/toastify.js";

const API_HOST = ENV.api_host;
const log = console.log

export const login = (app, users) => {
  const currUserName = document.getElementById("user-name").value;
  const currPassword = document.getElementById("password").value;

  const user = {
    "username": currUserName,
    "password": currPassword
  }

  const url = `${API_HOST}/users/login`;

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(user),
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
    }
  });

  fetch(request)
  .then((res) => {
    // Logged in successfully
    if (res.status === 200) {
      return res.json()
    }
    else {
      return res.text()
    }
  })
  .then((result) => {
    // log(typeof(result))
    if (typeof(result) === 'object') {
      // log(result);
      app.setState({
        currUser: result.currentUser,
        page: "dashboard"
      });
      // log(app.state)
      return;
    }
    else {
      errorToast(result);
      return;
    }
  })
  .catch(error => {
    log(error)
  })
}

export const register = app => {
  app.setState({
    page: "register"
  });
};
