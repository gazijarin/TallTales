import ENV from './../../config.js';
import { errorToast } from "../../actions/toastify/toastify.js";
import { storySavedOnce } from '../sockets/story.js';

const API_HOST = ENV.api_host;
const log = console.log

export const sortPlayers = (a, b) => {
    // Gets passed in array of users from database
    const aScore = parseInt(a.score);
    const bScore = parseInt(b.score);
    if(aScore > bScore) {
        return -1;
    }
    if(aScore < bScore) {
        return 1;
    }
    return 0;
}

function saveStoryToUser(user, story, app) {
    const url = `${API_HOST}/users/stories/${user.username}`;

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(story),
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
                page: "dashboard"
            });
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

export const saveStory = (user, story, app, page) => {
    // Checks if someone has saved the story to the DB already
    if (page.state.story !== null) {
        // Saves story to the user
        saveStoryToUser(user, page.state.story, app);
    }

    else { // No one has saved story to DB 
        // Saves the story to the DB
        const url = `${API_HOST}/stories/start`;

        story.userScores = page.state.users;

        const request = new Request(url, {
            method: "post",
            body: JSON.stringify(story),
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
            if (typeof(result) === 'object') { // Saves story to user
                storySavedOnce(app.state.users, result);
                saveStoryToUser(user, result, app);
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
}