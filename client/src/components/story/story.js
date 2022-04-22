import React from "react";

import "./story.css";

class Story extends React.Component {
  render() {
    const { story } = this.props;

    return (
      <div className="story">
        <div className="story-title">STORY</div>
        <div className="story-current">{story}<strong id="last-sentence"> </strong></div>
      </div>
    );
  }
}

export default Story;
