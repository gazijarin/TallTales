import React from "react";
import AppName from "../../components/appName/appName.js";
import Button from "../../components/button/button.js";
import CompletedStory from "../../components/completedStory/completedStory.js";
import Scoreboard from "../../components/scoreboard/scoreboard.js";
import MuteButton from "../../components/muteButton/muteButton.js";

import "./leaderboard.css"

import { sortPlayers, saveStory } from "../../actions/leaderboard/displayScores.js";
import { getCurrentUser } from "../../actions/global/users.js";
import { storySaved } from "../../actions/sockets/story.js";
import { backButtonHandler } from "../../actions/router/render.js";
import { stop } from "../../actions/audio/stopAudio.js";

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/leaderboard");
    }

    state = {
        user: {
            username: "jasper",
            score: 110,
            icon: "avatar01.png"
        },
        users: [
            {
                username: "jasper",
                score: 110,
                icon: "avatar01.png"
            },
            {
                username: "chris",
                score: 110,
                icon: "avatar02.png"
            },
            {
                username: "gazi",
                score: 50,
                icon: "avatar03.png"
            },
            {
                username: "jordan",
                score: 70,
                icon: "avatar04.png"
            }
        ],
        story: null
    }

    componentDidMount() {
        backButtonHandler(this.props.app, this.props.history);

        // Sort the users from highest to lowest points
        this.setState({
            users: this.props.app.state.users.sort(sortPlayers),
            user: getCurrentUser(this.props.app)
        });

        storySaved(this);
    }

    render() {
        const footerMessages = [
            "You have the highest score! Your effort paid off!",
            "Good effort! One day they'll recognize your genius..."
        ]

        return (
            <div className="leaderboard">
                <div className="header">
                    <AppName></AppName>
                </div>
                <div className="leaderboard-content">
                    <div className="leaderboard-story">
                        <CompletedStory story={this.props.app.state.story} title="The completed story..."/>
                    </div>
                    <div className="leaderboard-scoreboard">
                        <Scoreboard users={this.state.users} />
                    </div>   
                </div>
                <div className="footer">
                    <div className="footer-message">
                        {(this.state.user.score === this.state.users[0].score) ? 
                        footerMessages[0] : footerMessages[1]}
                    </div>
                    <div className="footer-button">
                        <Button text="HOME" 
                            handleClick={() => {
                                stop(this.props.gameAudioRef);
                                saveStory(this.state.user, this.props.app.state.story, this.props.app, this)
                            }}
                        /> 
                    </div>
                </div>   
                <div className="mute-footer">
                    <MuteButton app={this.props.app} audioRefs={[this.props.gameAudioRef]}/>
                </div>    
            </div>    
        )
    }
}

export default Leaderboard;