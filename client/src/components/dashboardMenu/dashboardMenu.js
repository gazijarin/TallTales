import React from "react";
import Button from "../button/button.js";
import "./dashboardMenu.css";
import { menuRedirect, logout, hostGame } from "../../actions/dashboard/menu.js";
import { createdNewRoom } from "../../actions/sockets/room.js";

class DashboardMenu extends React.Component {
  componentDidMount() {
    createdNewRoom(this.props.app);
  }

  render() {
    return (
      <span className="dashboardMenu">
        <Button
          text="HOST NEW GAME"
          handleClick={() => {
            hostGame(this.props.app, this.props.parent);
          }}
        />
        <Button
          text="JOIN GAME"
          handleClick={() => {
            menuRedirect(this.props.app, "gamesList");
          }}
        />
        <Button
          text="PROFILE"
          handleClick={() => {
            menuRedirect(this.props.app, "profile");
          }}
        />
        {this.props.parent.state.user.admin ? 
          <Button
            text="ADMIN MENU"
            handleClick={() => {
              menuRedirect(this.props.app, "adminMenu");
            }}
          /> : 
          <></>
        }
        <Button
          text="LOG OUT"
          handleClick={() => {
            logout(this.props.app);
          }}
        />
      </span>
    );
  }
}

export default DashboardMenu;
