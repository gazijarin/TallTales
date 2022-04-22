import React from "react";
import Button from "../button/button.js";
import "./profileMenu.css";
import { menuRedirect } from "../../actions/dashboard/menu.js";

class AdminMenu extends React.Component {
  render() {
    // Import mock data
    this.usersData = require("./../../data/users.json");

    return (
      <span className="dashboardMenu">
        <Button text="BROWSE USERS"
                handleClick={() => {
                this.handleClick(this.state);}} />
        <Button text="BACK"
                handleClick={() => {
                menuRedirect(this.props.app, "dashboard");}} />
        <Button text="LOG OUT"
                handleClick={() => {
                this.handleClick(this.state);}} />
      </span>
    )
  }
}

export default AdminMenu
