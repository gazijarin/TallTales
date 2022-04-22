import { socket } from "./socket";
import { chooseRaconteur } from "../vote/raconteur";
import { updatePrompt } from "../prompt/displayPrompt";

// const log = console.log;

export const updateStory = (story, users, app) => {
    // Updates prompt
    const appStage = updatePrompt(app);
    // console.log(appStage);

    // Checks if game is over
    if (appStage.stage !== 3) {
        // Chooses new raconteur
        users = chooseRaconteur(users);
    }

    if (appStage.stage === 3) {
        for (let i = 0; i < users.length; i++) {
            users[i].raconteur = false;
        }
    }

    socket.emit("update-story", {
        room: users[0].room,
        story: story,
        prompt: appStage.prompt,
        stage: appStage.stage,
        users: users
    });
}

export const storyUpdated = (app) => {
    socket.on("story-updated", ({ story, prompt, stage, users }) => {
        app.setState({
            story: story,
            prompt: prompt,
            stage: stage,
            users: users,
            page: "inputStage"
        });
    });
}

export const storySavedOnce = (users, savedStory) => {
    socket.emit("saved-story", {
        room: users[0].room,
        story: savedStory
    })
}

export const storySaved = (page) => {
    socket.on("story-saved", ({ story }) => {
        page.setState({
            story: story
        });
    });
}