import React from "react";

import "./score.css";

class Score extends React.Component {
  render() {
    return (
      <div className="score">
        <span>
          SCORE:
          <span className="score-number">{this.props.user.score}</span>
        </span>
      </div>
    );
  }
}

export default Score;
