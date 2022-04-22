"use strict";
const log = console.log;

const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const { mongoose } = require("./db/mongoose");
const MongoStore = require("connect-mongo");
const { ObjectID } = require("mongodb");

require("dotenv").config({ path: path.resolve(__dirname, "../config.env") });

const env = process.env.NODE_ENV;
const port = process.env.PORT;

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/client/build")));

const userRouter = require("./routes/users");
const storyRouter = require("./routes/stories");
const roomRouter = require("./routes/rooms");

app.use("/users", userRouter);
app.use("/stories", storyRouter);
app.use("/rooms", roomRouter);

app.use(
    session({
        secret: "thisisasecretkeyasdfkl",
        resave: false,
        saveUninitialized: false,
    })
)

const { User } = require("./models/user.model");

// Login User
/*
    {
        "username": <String>,
        "password": <String>
    }
*/
app.post('/users/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findByUsernamePassword(username, password)
      .then(user => {
          // Add the user's id to the session
          req.session.userid = user._id;
          req.session.username = user.username;
          res.send({ currentUser: user.username });
      })
      .catch(error => {
          res.status(400).send(error);
      })
})

app.get('/users/logout', (req, res) => {
  // Remove the session
  req.session.destroy(error => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send();
      }
  });
})


// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
  if (req.session.userid) {
      res.send({ currentUser: req.session.username });
  } else {
      res.status(401).send();
  }
});

app.get("*", (req, res) => {
  const pageRoutes = ["/"];
  if (!pageRoutes.includes(req.url)) {
    res.status(404);
  }

  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// HELPERS
// TODO: Move to utils

let users = [];
let rooms = {
  main: false
};

// Join user to chat
function userJoin(
  id,
  username,
  icon,
  score,
  raconteur,
  currentSentence,
  host,
  room
) {
  const user = {
    id,
    username,
    icon,
    score,
    raconteur,
    currentSentence,
    host,
    room
  };

  users.push(user);

  return user;
}

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

function updateRaconteur(raconteur, prevRaconteur) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === raconteur) { // Found the raconteur
      users[i].raconteur = true;
      users[i].currentSentence = "Raconteur";
    }

    if (users[i].username === prevRaconteur) { // Found the previous raconteur
      users[i].raconteur = false;
      users[i].currentSentence = ". . .";
    }
  }
}

function userLeave(id) {
  const usersIndex = users.findIndex(user => user.id === id);
  if (usersIndex !== -1) {
    return users.splice(usersIndex, 1)[0];
  }
}

function allUsersInput(users) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].currentSentence === ". . .") {
      return false;
    }
  }
  return true;
}

function saveInput(newUsers, room) {
  for (let i = 0; i < newUsers.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (users[j].username === newUsers[i].username) {
        users[j].currentSentence = newUsers[i].currentSentence;
      }
    }
  }
}

io.on("connection", socket => {
  // Join user to room
  socket.on("join-room", ({ user, room }) => {
    if (!rooms[room] && getRoomUsers(room).length < 5) { // Checks if game is in progress or if game lobby already has 5 players
      const currUser = userJoin(
        socket.id,
        user.username,
        user.icon,
        user.score,
        user.raconteur,
        user.currentSentence,
        user.host,
        room
      );
      socket.join(currUser.room);
      io.emit("message", `${currUser.username} has joined ${currUser.room}`);
      io.to(currUser.room).emit("update-users", {
        users: getRoomUsers(currUser.room),
        room: currUser.room
      });
      io.emit("update-db", {
        users: getRoomUsers(currUser.room),
        room: currUser.room
      })
    } else {
      if (rooms[room]) { // If game is in progress
        socket.emit("deny-room-access", "Room in Progress!");
      }
      else { // If room is full
        socket.emit("deny-room-access", "Room is full!");
      }
    }
  });

  socket.on("change-host", changedUsers => {
    users = changedUsers;
  });

  socket.on("create-room", newRoom => {
    console.log(newRoom);
    io.emit("created-room", newRoom);
  });

  socket.on("update-rooms", changedRooms => {
    rooms = changedRooms;
  });

  socket.on("update-raconteur", ({ raconteur, prev }) => {
    updateRaconteur(raconteur, prev);
  })

  socket.on("start-game", ({ room, storyStart, storyPrompts, users }) => {
    io.to(room).emit("game-started", {
      storyStart: storyStart,
      storyPrompts: storyPrompts,
      users: users,
      rooms: rooms,
      room: room
    });
  });

  socket.on("update-sentence", ({ room, users }) => {
    saveInput(users, room);
    // Checks if all users have updated their sentence
    if (allUsersInput(users)) {
      // log('all-users')
      io.to(room).emit("all-users-input", {
        users: users
      });
    } else {
      io.to(room).emit("update-users", {
        users: users
      });
    }
  });

  socket.on("raconteur-vote", ({ room, users, story }) => {
    io.to(room).emit("receive-vote", {
      users: users,
      story: story
    });
  });

  socket.on("update-story", ({ room, story, prompt, stage, users }) => {
    // Updates serverside list of users
    io.to(room).emit("story-updated", {
      story: story,
      prompt: prompt,
      stage: stage,
      users: users
    });
  });

  socket.on("saved-story", ({ room, story }) => {
    rooms[room] = false;
    log(rooms);
    io.to(room).emit("story-saved", {
      story: story
    });
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    log(`${socket.id} disconnected`);
    const currUser = getCurrentUser(socket.id);

    if (currUser) { // User exists
      userLeave(socket.id); 
      // Checks if user was part of in progress game
      if (rooms[currUser.room]) { // Game was in progress
        if (getRoomUsers(currUser.room).length === 1) { // If they are last person left in the room
          rooms[currUser.room] = false;
          io.to(currUser.room).emit("game-forfeit", {
            users: getRoomUsers(currUser.room),
            str: "The game has ended since all players left"
          });
          io.to(socket.id).emit("stop-audio");
        }

        // Checks if user was raconteur
        else if (currUser.raconteur) { // User was raconteur
          io.to(currUser.room).emit("raconteur-left", {
            users: getRoomUsers(currUser.room),
            str: `${currUser.username} was the raconteur and they left`
          });
        }

        else { // User was not raconteur
          io.to(currUser.room).emit("user-left", {
            users: getRoomUsers(currUser.room),
            str: `${currUser.username} has left the game`
          });

          if (allUsersInput(getRoomUsers(currUser.room))) {
            io.to(currUser.room).emit("all-users-input", {
              users: getRoomUsers(currUser.room)
            });
          }
        }
      }

      else { // User was not in game
        io.to(currUser.room).emit("update-users", {
          room: currUser.room,
          users: getRoomUsers(currUser.room),
          rooms: rooms
        });

        io.emit("update-db", {
          users: getRoomUsers(currUser.room),
          room: currUser.room
        })
      }
    }
  });
});

server.listen(port, () => {
  log(`listening on port ${port}...`);
});
