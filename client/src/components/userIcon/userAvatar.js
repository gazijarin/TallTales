import React from "react";
import "./userIcon_style.css";

class UserAvatar extends React.Component {
  render() {
    return (
      <div className="userIconAvatar">
        <img className="normalAvatar" src={require("../../assets/images/" + this.props.icon)} alt=""></img>
      </div>
    );
  }
}
// TODO: change hardcoded username to dynamic (current user)

export default UserAvatar;
