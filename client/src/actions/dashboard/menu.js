import ENV from './../../config.js';
import { joinRoom, createNewRoom } from '../sockets/room.js';

const API_HOST = ENV.api_host;
const log = console.log

export const menuRedirect = (app, page) => {
  app.setState({
    page: page
  });
};

export const logout = app => {
  app.setState({
    currUser: null,
    page: "login"
  });
};

function generateCode() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 4; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const hostGame = (app, page) => {
  const host = app.state.currUser;

  const url = `${API_HOST}/rooms/create`;

  const tryFetch = () => {
    const room = {
      code: generateCode(),
      host: host,
      users: 1
    }
  
    const request = new Request(url, {
      method: "post",
      body: JSON.stringify(room),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
  
    fetch(request)
    .then((res) => {
      if (res.status === 200) {
        joinRoom(page.state.user, room.code);
        createNewRoom([...app.state.rooms, room.code]);
        return;
      }
      else {
        tryFetch();
      }
    })
    .catch(err => {
      log(err);
    })
  }

  tryFetch();
}
