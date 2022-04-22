import React from "react";
import AppName from "../../components/appName/appName.js";
import Button from "../../components/button/button.js";
import CompletedStory from "../../components/completedStory/completedStory.js";
import Scoreboard from "../../components/scoreboard/scoreboard.js";
import {
  loadStory,
  copyToClipboard
} from "../../actions/indivStory/loadStory.js";

import "./indivStory.css";

class IndivStory extends React.Component {
  state = {
    story: {
      title: "",
      start: "",
      story: "",
      contributions: [],
      prompt: {},
      userScores: []
    }
  };

  componentDidMount() {
    loadStory(this, window.location.href);
  }

  render() {
    return (
      <div className="indiv-story">
        <div className="header">
          <AppName text={this.state.story.title}></AppName>
        </div>
        <div className="indiv-story-content">
          <div className="indiv-story-story">
            <CompletedStory
              story={this.state.story}
              title={"<THE COMPLETED STORY>"}
            />
          </div>
          <div className="indiv-story-scoreboard">
            <Scoreboard users={this.state.story.userScores} />
          </div>
        </div>
        <div className="indiv-story-footer">
          <div className="indiv-story-footer-button">
            <Button
              text="COPY TO CLIPBOARD"
              handleClick={() => {
                copyToClipboard(window.location.href);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default IndivStory;
