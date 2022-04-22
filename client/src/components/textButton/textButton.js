import React from "react";
import Button from '@mui/material/Button';

import "./textButton.css";

class TextButton extends React.Component {

    render() {
        const { text, handleClick } = this.props;

        return (
            <div className="text-button">
                <Button 
                    onClick={handleClick}
                >
                    {text}
                </Button>
            </div>
        )
    }
}

export default TextButton;