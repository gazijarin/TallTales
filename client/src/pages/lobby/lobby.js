import React from "react";
import ReactAudioPlayer from 'react-audio-player';
import AppName from "../../components/appName/appName.js";
import Button from "../../components/button/button.js";
import DropDown from "../../components/dropDown/dropDown.js";
import UserIcon from "../../components/userIcon/userIcon.js";
import MuteButton from "../../components/muteButton/muteButton.js";

import "./lobby.css";

import { getGenres, redirect } from "../../actions/lobby/lobby.js";
import { gameStarted } from "../../actions/sockets/startGame.js";
import { backButtonHandler } from "../../actions/router/render.js";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/lobby");
  }

  state = {
    user: {
      username: "",
      icon: "avatar01.png",
      stories: []
    },
    genres: [],
    starts: [],
    start:
      "chris and jordan are trying to turn random cans of food into something remotely tasty. When most canned “food” is either pet food or well past its expiration date (or both), they’ve got to turn to other means.",
    prompts: [],
    prompt: {
      backstory: [
        "Backstory 1/3: Where is this happening exactly?",
        "Backstory 2/3: Who else is involved?",
        "Backstory 3/3: Anything else to set up?"
      ],
      conflict: [
        "Conflict 1/4: How can we make the story more spicy?",
        "Conflict 2/4: What if one of our heroes got attacked by a monkey?",
        "Conflict 3/4: Oh my god! Rats everywhere!",
        "Conflict 4/4: Last chance for things to go wrong!"
      ],
      resolution: [
        "Resolution 1/3: Okay, time to resolve the drama.",
        "Resolution 2/3: Any loose ends left?",
        "Resolution 3/3: Final chance to wrap things up!"
      ]
    },
    muted: false,
  };
  componentDidMount() {
    backButtonHandler(this.props.app, this.props.history);
    getGenres(this);
    gameStarted(this.props.app, this.props.gameAudioRef, this.props.audio60Ref, this.props.audio30Ref, this.props.audio10Ref);
  }

  render() {
    const genres = this.state.genres.map(object => object.genre);

    return (
      <div className="lobby">
        <ReactAudioPlayer
            src={require("../../assets/music/lobby.wav")}
            autoPlay
            loop
            volume={0.3}
            ref={(element) => { this.audioRef = element}}
        />
        <ReactAudioPlayer
            src={require("../../assets/audio/lobby_intro.mp3")}
            autoPlay
            volume={0.7}
            ref={(element) => { this.introRef = element}}
        />
        <div className="header">
          <AppName></AppName>
        </div>
        <div className="lobby-content">
          {/* {this.props.app.state.users[0].username ===
          this.props.app.state.currUser ? (
            <div className="lobby-genre">
              <DropDown app={this.props.app} items={genres}></DropDown>
            </div>
          ) : (
            <span></span>
          )} */}

          <div className="lobby-column">
            <div className="lobby-header">LOBBY</div>
            <div className="lobby-players">
              {this.props.app.state.users.map((e, i) => {
                return (
                  <div key={i} className="lobby-player">
                    <UserIcon username={e.username} icon={e.icon} host={e.host}></UserIcon>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {this.props.app.state.users[0].username ===
        this.props.app.state.currUser ? (
          <Button
            text="START GAME"
            handleClick={() => {
                redirect(this.props.app, this.state.start, this.state.prompt);
            }}
          ></Button>
        ) : (
          <></>
        )}
        <div className="mute-footer">
            <MuteButton app={this.props.app} audioRefs={[this.audioRef, this.introRef]}/>
        </div>
      </div>
    );
  }
}

export default Lobby;
