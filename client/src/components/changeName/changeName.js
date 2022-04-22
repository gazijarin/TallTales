import React from "react";
import Button from "../../components/button/button.js";
import TextField from "@mui/material/TextField";

import "./changeName.css";

import { changeName } from "../../actions/editProfile/editProfile";

class ChangeName extends React.Component {
  render() {
    const handleClick = () => {
        changeName(this.props.app, this.props.parent);
    }

    return (
      <div className="changeUserDetailsInterface">
        <div className="profileInputSection">
            <TextField
                id="change-username"
                label="<NEW-USERNAME>"
                variant="filled"
                margin="normal"
                maxRows="1"
                onKeyUp={
                    (event) => {
                        if (event.key === 'Enter') {
                            handleClick();
                        }
                    }
                }
            />
        </div>
        <div className="profileInputButton">
          <Button text="CHANGE USERNAME"
                  handleClick={handleClick} />
        </div>
      </div>
    )
  }
}

export default ChangeName;
