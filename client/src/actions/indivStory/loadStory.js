import ENV from './../../config.js';
import { successToast, errorToast } from '../toastify/toastify.js';

const API_HOST = ENV.api_host;
const log = console.log

export const loadStory = (page, url) => {
    const paramString = url.split('?')[1];
    const queryString = new URLSearchParams(paramString);
    let story = "";
    let user = "";

    for (let pair of queryString.entries()) {
        if (pair[0] === 'story') {
            story = pair[1];
        }

        if (pair[0] === 'user') {
            user = pair[1];
        }
    }

    // Checks there is a story and user param
    if (story !== "" && user !== "") {
        const route = `${API_HOST}/users/stories/${user}/${story}`

        fetch(route)
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
                page.setState({
                    story: result
                })
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

export const copyToClipboard = (str) => {
    navigator.clipboard.writeText(str);

    successToast("Copied to clipboard!");
} 