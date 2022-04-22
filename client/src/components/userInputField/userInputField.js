import React from "react";
import TextField from "@mui/material/TextField";


import "./userInputField.css";

class UserInputField extends React.Component {
    render() {
        const { text, enterFunction, id } = this.props;

        const onKeyUp = (enterFunction) ? ((event) => {
                if (event.key === 'Enter') {
                    enterFunction();
                }
            }) : undefined;
        return (
            <div className="userInputFieldContainer">
                <div className={"userInputTextField" +  ((this.props.id === 1) ? "One" : "Two")}>
                    <TextField
                        id="starterPrompt"
                        label={text}
                        variant="filled"
                        margin="normal"
                        maxRows="1"
                        onKeyUp={onKeyUp}
                    />
                </div>
            </div>
        );
    }
}

export default UserInputField;
