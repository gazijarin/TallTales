import React from "react";
import Button from "../button/button.js";
import "./profileMenu.css";

import { menuRedirect } from "../../actions/dashboard/menu.js";

class ProfileMenu extends React.Component {
  render() {
    return (
      <span className="dashboardMenu">
        
        <Button text="COMPLETED STORIES"
                handleClick={() => {
                  menuRedirect(this.props.app, "completedStories")}} />
        <Button text="CHANGE USERNAME"
                handleClick={() => {
                  menuRedirect(this.props.app, "editUsername")}} />
        <Button text="CHANGE PASSWORD"
                handleClick={() => {
                 menuRedirect(this.props.app, "editPassword")}} />
        <Button text="CHANGE AVATAR"
                handleClick={() => {
                 menuRedirect(this.props.app, "editAvatar")}} />
        <Button text="BACK"
                handleClick={() => {
                  menuRedirect(this.props.app, "dashboard")}} />
      </span>
    )
  }
}

export default ProfileMenu
