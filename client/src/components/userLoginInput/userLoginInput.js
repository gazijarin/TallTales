import React from "react";
import TextField from "@mui/material/TextField";


import "./userLoginInput.css";

class UserLoginInput extends React.Component {
    render() {
        const { text, enterFunction } = this.props;

        const onKeyUp = (enterFunction) ? ((event) => {
                if (event.key === 'Enter') {
                    enterFunction();
                }
            }) : undefined;
        return (
            <div className="user-login-input">
                <div className="user-login-text">{text}</div>
                <div className="user-input-fields">
                    <TextField
                        id="user-name"
                        label="<user-name>"
                        variant="filled"
                        margin="normal"
                        maxRows="1"
                        onKeyUp={onKeyUp}
                    />
                   <TextField
                        id="password"
                        label="<password>"
                        type="password"
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

export default UserLoginInput;