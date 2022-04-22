import React from "react";
import AppName from "../../components/appName/appName.js";
import Score from "../../components/score/score.js";
import Story from "../../components/story/story.js";
import UserIcon from "../../components/userIcon/userIcon.js";
import MuteButton from "../../components/muteButton/muteButton.js";

import "./voteStage.css";

import { select, confirmVote, checkRaconteur } from "../../actions/vote/vote.js";
import { loadUserInput, receiveVote } from "../../actions/sockets/vote.js";
import { getCurrentUser } from "../../actions/global/users.js";
import { storyUpdated } from "../../actions/sockets/story.js";
import { backButtonHandler } from "../../actions/router/render.js";

class VoteStage extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/voteStage");
  }

  state = {
    choice: "Choose a sentence",
    loadInputs: false,
    raconteur: "",
    confirmedVote: false,
    user: {
      username: "",
      icon: "avatar01.png"
    }
  }

  componentDidMount() {
    backButtonHandler(this.props.app, this.props.history);
    
    // Sets up socket to receive vote
    receiveVote(this.props.app, this);
    storyUpdated(this.props.app);

    // Finds raconteur
    checkRaconteur(this.props.app, this);

    // Loads all user inputs when everyone is done
    loadUserInput(this.props.app, this);

    this.setState({
      user: getCurrentUser(this.props.app)
    });

    // AI Stuff
    // if (this.state.loadInputs) {
    //   if (this.state.raconteur === this.props.app.state.currUser) {
    //     generateAIinput(this.props.app.state.users, this.props.app, this);
    //   }
    //   else {
    //     AIinput(this.props.app.state.users, this.props.app, this);
    //     AIVote(this.props.app.state.users, this.props.app.state.story.story, this.state.raconteur, this.props.app, this);
    //   }
    // }

  }

  render() {
    // console.log('votepage')
    return (
      <div className="vote-stage">
        <div className="input-stage-header">
          <AppName></AppName>
          <Score user={this.state.user}></Score>
        </div>
        <div className="vote-stage-content">
          <div className="vote-stage-story">
            <div className="story-content">
              <Story story={this.props.app.state.story.story}></Story>
            </div>
          </div>
          <div className="vote-stage-turns">
            {
              this.state.raconteur === this.props.app.state.currUser ?
              <div className="vote-stage-raconteur">
                <span className="raconteur">YOUR</span> TURN
              </div> :
              <div className="vote-stage-raconteur">
                <span className="raconteur">{this.state.raconteur}</span>'s TURN
              </div>
            }
            <div className="vote-stage-options">
              {this.props.app.state.users.map((e, i) => {
                if (e.username !== this.state.raconteur) {
                  return (
                    <div key={i} className="vote-stage-option">
                      <UserIcon username={e.username} icon={e.icon}></UserIcon>
                      <div className="vote-option-text" id={e.username} onClick={() => {select(e.username, this.state.raconteur, this.props.app, this);}}>
                        {
                          !this.state.loadInputs ? (
                            e.currentSentence !== ". . ." ?
                              "Submitted" :
                              ". . ."
                          ) :
                            e.currentSentence
                        }
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        {
          this.props.app.state.currUser === this.state.raconteur ?
          <div className="vote-stage-sentence">
            <div className="sentence-title">YOUR CHOICE</div>
            <div className="sentence-content-choice">
              {this.state.choice}
            </div>
            <div className="checkMarkContainer" onClick={() => {confirmVote(this.props.app, this);}}>
              <img src={require("../../assets/images/pixelCheckmark.png")} width="30" height="30" alt="" />
            </div>
          </div>
          :
          <div className="vote-stage-sentence">
            <div className="sentence-title">YOUR SENTENCE</div>
            <div className="sentence-content">
              {this.state.user.currentSentence}
            </div>
          </div> 
        }
        <div className="mute-footer">
            <MuteButton app={this.props.app} audioRefs={[this.props.gameAudioRef]}/>
        </div>
        
      </div>
    );
  }
}

export default VoteStage;
