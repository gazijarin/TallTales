import { socket } from "./socket";
import { warningToast } from "../toastify/toastify";
import { chooseRaconteur } from "../vote/raconteur";
// import { isRaconteur } from "../prompt/displayPrompt";
import { updateSentence } from "./updateUser";
import { updateRoomNum } from "../gamesList/rooms"

// const log = console.log;

export const joinRoom = (user, room) => {
  socket.emit("join-room", {
    user: {
      username: user.username,
      icon: user.icon,
      score: 0,
      raconteur: false,
      currentSentence: ". . .",
      host: false
    },
    room: room
  });
};

export const updateRoom = (app) => {
  socket.on("update-users", ({ users, room, roomInProgress }) => {
    if (app.state.page === "dashboard" || app.state.page === "gamesList") {
      updateRoomNum(room, users.length);
      // User is on dashboard
      users[0].host = true;
      socket.emit("change-host", users);
      app.setState({
        page: "lobby",
        users: users,
        roomInProgress
      });
    } else if (app.state.page === "lobby") {
      // User is on lobby page
      users[0].host = true;
      socket.emit("change-host", users);
      app.setState({
        users: users,
        roomInProgress
      });
    } else {
      app.setState({
        // Updates current state of users
        users: users,
        roomInProgress
      });
    }
  });
};

export const createNewRoom = rooms => {
  socket.emit("create-room", rooms);
};

export const createdNewRoom = app => {
  socket.on("created-room", newRoom => {
    app.setState({
      rooms: newRoom
    });
  });
};

export const denyRoomAccess = () => {
  socket.on("deny-room-access", s => {
    warningToast(s);
  });
};

export const userLeft = (app) => {
  socket.on("user-left", ({ users, str }) => {
    if (app.state.page !== "leaderboard") { // User is not on leaderboard
      warningToast(str);
      app.setState({
        users: users
      });
    }
  })
}

export const raconteurLeft = (app) => {
  socket.on("raconteur-left", ({ users, str }) => {
    if (app.state.page !== "leaderboard") { // User not on leaderboard page
      // Choose a new raconteur
      chooseRaconteur(users);

      updateSentence(users);

      if (app.state.currUser === users[0].username) { // You are new raconteur
        warningToast(str + " making you Raconteur");
        users[0].currentSentence = "Raconteur";
        app.setState({
          users: users,
          page: "voteStage"
        });
        updateSentence(users);
      }

      else {
        warningToast(str);

        if (app.state.page === "voteStage") { // Already on vote screen
          app.setState({
            users: users,
            page: "inputStage"
          });
          app.setState({ // Rerender vote stage
            page: "voteStage"
          })
        }

        else {
          app.setState({
            users: users,
          })
        }
      }
    }
  })
}

export const forfeitGame = (app) => {
  socket.on("game-forfeit", ({ users, str }) => {
    if (app.state.page !== "leaderboard") {
      warningToast(str);

      app.setState({
        page: "lobby",
        users: users
      });
    }
  })
}

export const updateNumPlayers = (app) => {
  socket.on("update-db", ({ users, room }) => {
    if (app.state.page === "gamesList") {
      updateRoomNum(room, users.length);
      
      // Rerender gamesList page
      app.setState({
        page: "dashboard"
      });
      app.setState({
        page: "gamesList"
      })
    }
  })
}
