import { updatePrompt } from "../prompt/displayPrompt";
import { findRaconteur } from "./raconteur";
import { raconteurVoted } from "../sockets/vote";
import { updateStory } from "../sockets/story";

export const AIinput = (users, app, page) => {
    // Gets passed in array of users from database
    const input = app.state.stage + app.state.prompt;
    for (let i = 0; i < users.users.length; i++) {
        if (users.users[i].raconteur !== true) {
            if (users.users[i].username !== app.state.currUser.username) {
                // Requires server call to change AI user inputs to a preset input from the database
                users.users[i].currentSentence = users.inputs[i].inputs[input];
            }
        }
    }

    page.setState({
        loading: false
    })
}

export const generateAIinput = (users, app, page) => {    
    // Gets passed in array of users from database
    setTimeout(() => {
        AIinput(users, app, page)
    }, 3000);
}

export const AIVote = (users, stories, raconteur, app, page) => {
    // Gets passed in array of users and stories from database
    setTimeout(() => {
        let vote = (Math.floor(Math.random() * users.users.length));
        // let vote = 0;
        while (users.users[vote].username === raconteur) {
            vote = (Math.floor(Math.random() * users.users.length));
        }

        const user = users.users[vote];
        const input = user.currentSentence;

        document.getElementById('last-sentence').childNodes[0].nodeValue = " " + input;
        // Requires server call to update user's score
        user.score = user.score + 100;
        document.getElementById(user.username).classList.add("vote-option-text-selected");

        // Adds contributions
        // Requires server call to add contribution to story
        stories.currStory.contributions.push({
            username: user.username,
            sentence: input
        })

        page.setState({
            loading: false
        })
        // document.getElementsByClassName("story-current")[0].childNodes[0].nodeValue = stories.currStory.story;

        // console.log(vote);

        setTimeout(() => {
            // Requires server call to add contribution to story
            stories.currStory.story = stories.currStory.story + " " + input;
            updatePrompt(app);
            app.setState({
                page: "inputStage"
            });
        }, 5000)

    }, 3000);
}

export const confirmVote = (app, page) => {
    const users = app.state.users;
    const story = app.state.story;
    const input = page.state.choice;

    // Checks if user has already voted and 
    if (!page.state.confirmedVote) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].currentSentence === input) {
                const selectUser = users[i];
    
                selectUser.score = selectUser.score + 100;
                
                // Adds contributions
                story.contributions.push({
                    username: selectUser.username,
                    sentence: input
                });
    
                raconteurVoted(story, users);
    
                page.setState({
                    confirmedVote: true
                });
    
                setTimeout(() => {
                    story.story = story.story + " " + input;
                    updateStory(story, users, app);
                }, 5000);
            }
        }
    }
}

export const select = (user, raconteur, app, page) => {
    // console.log(app);
    const users = app.state.users;

    // Checks if user has already confirmed vote and inputs have been loaded in
    if (!page.state.confirmedVote && page.state.loadInputs) {
        // Checks if currUser is raconteur
        if (app.state.currUser === raconteur) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === user) {
                    const selectUser = users[i];
                    const input = selectUser.currentSentence;

                    const sentences = document.getElementsByClassName('vote-option-text-selected');

                    if (sentences.length !== 0) {
                        sentences[0].classList.remove('vote-option-text-selected');
                    }

                    document.getElementById(user).classList.add("vote-option-text-selected");

                    page.setState({
                        choice: input
                    })
                }
            }
        }
    }
}

export const checkRaconteur = (app, page) => {
    const raconteur = findRaconteur(app.state.users);

    page.setState({
        raconteur: app.state.users[raconteur].username
    })
}