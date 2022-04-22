import React from "react";

import "./prompt.css";

class Prompt extends React.Component {
    
    render() {
        return (
            <div className="prompt">{this.props.prompt}</div>
        )
    }
}

export default Prompt;