import { socket } from "./socket";
import { getCurrentUser } from "../global/users";

// const log = console.log;

export const loadUserInput = (app, page) => {
    socket.on("all-users-input", ({ users }) => {
        app.setState({
            users: users
        })
        page.setState({
            loadInputs: true
        })
    })
}

export const raconteurVoted = (story, users) => {
    socket.emit("raconteur-vote", {
        room: users[0].room,
        users: users,
        story: story
    })
}

export const receiveVote = (app, page) => {
    socket.on("receive-vote", ({ users, story }) => {
        // Highlights last contribution in story
        document.getElementById('last-sentence').childNodes[0].nodeValue = " " + story.contributions[story.contributions.length - 1].sentence;

        app.setState({
            story: story,
            users: users
        });
        
        page.setState({
            confirmedVote: true,
            user: getCurrentUser(app)
        })
    })

    socket.on("")
}

