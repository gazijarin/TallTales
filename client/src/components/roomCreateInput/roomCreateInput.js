import React from "react";
import TextField from "@mui/material/TextField";
import TextButton from "../textButton/textButton.js";
import { joinRoom, createNewRoom } from "../../actions/sockets/rRoom";
import { getUser } from "../../actions/global/users.js";
import { errorToast, successToast } from "../../actions/toastify/toastify.js";

// import "./RoomCreateInput.css";

class RoomCreateInput extends React.Component {
  state = {
    user: {
      username: "",
      icon: "avatar01.png",
      stories: []
    }
  };

  componentDidMount() {
    getUser(this, this.props.app);
  }
  render() {
    const { enterFunction } = this.props;

    const onKeyUp = enterFunction
      ? event => {
          if (event.key === "Enter") {
            handleClick();
          }
        }
      : undefined;

    const handleClick = () => {
      const roomName = document.getElementById("room-name").value;
      if (!roomName) {
        errorToast("Enter a valid name!");
      } else {
        successToast("New room created!");
        joinRoom(this.state.user, roomName);
        createNewRoom([...this.props.app.state.rooms, roomName]);
      }
    };
    return (
      <div className="user-login-input">
        <div className="user-input-fields">
          <TextField
            id="room-name"
            label="<room-name>"
            variant="filled"
            margin="normal"
            maxRows="1"
            onKeyUp={onKeyUp}
          />
        </div>
        <TextButton
          text="<CREATE A NEW ROOM>"
          handleClick={handleClick}
        ></TextButton>
      </div>
    );
  }
}

export default RoomCreateInput;
