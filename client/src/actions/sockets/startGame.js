import { socket } from "./socket";
import { userLeft, raconteurLeft, forfeitGame } from "./room";
// const log = console.log;

export const startGame = (app, start, prompts) => {
  const users = app.state.users;
  users[0].raconteur = true;

  socket.emit("update-raconteur", {
    raconteur: users[0].username,
    prev: null
  })

  socket.emit("start-game", {
    room: users[0].room,
    storyStart: start,
    storyPrompts: prompts,
    users: users
  });
};

export const gameStarted = (app, gameAudioRef, audio60Ref, audio30Ref, audio10Ref) => {
  socket.on("game-started", ({ storyStart, storyPrompts, users, rooms, room }) => {
      // Sets up listeners if someone leaves the game
      userLeft(app);
      raconteurLeft(app);
      forfeitGame(app);
      gameAudioRef.audioEl.current.play();
      if(app.state.muted) {
        gameAudioRef.audioEl.current.muted = true;
        audio60Ref.audioEl.current.muted = true;
        audio30Ref.audioEl.current.muted = true;
        audio10Ref.audioEl.current.muted = true;
      }
      rooms[room] = true;
      socket.emit("update-rooms", rooms);
      app.setState({
        story: {
          start: storyStart,
          story: storyStart,
          contributions: [],
          prompt: storyPrompts
        },
        users: users,
        page: "inputStage",
        prompt: 0,
        stage: 0
      });
    }
  );
};
