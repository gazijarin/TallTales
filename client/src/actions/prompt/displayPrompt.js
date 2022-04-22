// const log = console.log
import { updateSentence } from "../sockets/updateUser";

export const updatePrompt = (app) => {
    const state = app.state;

    if (state.prompt === 2 && state.stage === 0) {
        return {
          stage: 1,
          prompt: 0
        };
      } else if (state.prompt === 3 && state.stage === 1) {
        return {
          stage: 2,
          prompt: 0
        };
      } else if (state.prompt === 2 && state.stage === 2) {
        return {
          stage: 3,
          prompt: 0
        };
      } 
      else {
        return {
          prompt: state.prompt + 1,
          stage: state.stage
        };
      }
}

export const displayPrompt = (app) => {
  // Gets passed in array of stories from database
    switch (app.state.stage) {
        case 0:
          return app.state.story.prompt.backstory[app.state.prompt];
        case 1:
          return app.state.story.prompt.conflict[app.state.prompt];
        case 2:
          return app.state.story.prompt.resolution[app.state.prompt];
        default:
          return "Story is complete!";
      }
}

export const isRaconteur = (app, currUser, users) => {
  let raconteur = false;
  for (let i = 0; i < users.length; i++) {
    // Resets users sentence
    users[i].currentSentence = ". . ."
    if (users[i].raconteur) { 
      users[i].currentSentence = "Raconteur";
      if (users[i].username === currUser) { // Sends user to vote stage
        raconteur = true;
      }
    }
  }

  updateSentence(users);

  if (raconteur) {
    app.setState({
      page: "voteStage"
    })
  }
}

export const storyComplete = (app) => {
  if (app.state.stage === 3) {
    app.setState({
      page: "leaderboard"
    })
  }
}