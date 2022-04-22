import React from "react";

import "./button.css";

class Button extends React.Component {
    render() {
        const { text, handleClick } = this.props;

        return (
            <button onClick={handleClick} className='buttonStyle'>{text}</button>
        )
    }
}

export default Button;