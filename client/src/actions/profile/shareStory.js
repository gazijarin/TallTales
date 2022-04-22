import ENV from './../../config.js';
const API_HOST = ENV.api_host;

// const log = console.log

export const shareStory = (story, user) => {
    const url = `${API_HOST}/past-stories?story=${story._id}&user=${user}`

    // Opens page in new tab
    window.open(url);
}