import React from "react";
import AppName from "../../components/appName/appName.js";
import Button from "../../components/button/button.js";
import AdminMenu from "../../components/profileMenu/adminMenu.js";
import UserIcon from "../../components/userIcon/userIcon.js";
import TextButton from "../../components/textButton/textButton.js";
import UserInputField from "../../components/userInputField/userInputField.js";
import PromptCard from "../../components/promptCard/promptCard.js";
import "./admin.css";

import Stack from '@mui/material/Stack';

import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import MUIButton from '@mui/material/Button';

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import AddIcon from '@mui/icons-material/Add';

import DropDown from "../../components/dropDown/dropDown.js";

const users = require("../../data/users.json");
const stories = require("../../data/stories.json");

class AdminBrowsePrompts extends React.Component {
  render() {

    var genres = stories.stories.map(object => object.genre);

    genres.splice(0, 0, "<New Genre>");

    const theme = {
      spacing: 20,
    }

    return (
      <div className="adminDashboard">
        <span className="adminDashboardLeft">
          <div className="adminDashboardHeader">
            <AppName></AppName>
          </div>

          <AdminMenu></AdminMenu>

        </span>

        <span className="adminDashboardDivider">
        </span>

        <span className="adminDashboardRight">

        <div className="profileAvatarContainer">
          <UserIcon icon={"avatar01.png"} username={"name01"} />
        </div>

        <div className="adminContent" style={{ height: '600px', display: 'flex', 'flex-direction': 'column', 'justify-content': 'flex-start', width: '100%' }}>

          <div className="promptsMenuRow" style={{ display: 'flex', width: '100%', 'justify-content': 'flex-end' }}>
            <div className="promptsDropDown" style={{ width:'310px', 'margin-right':"10px" }}>
              <DropDown items={genres} app={this.props.app}></DropDown>
            </div>

            <div className="promptsDelete" style={{ width:'310px', 'margin-left':"10px", 'margin-right':'24px' }}>
              <span className="adminDashboardMenu">
                <Button text="DELETE GENRE"
                        handleClick={() => {
                        this.handleClick(this.state);}} />
              </span>
            </div>
          </div>

          <div className="promptsMenuRow promptsMenuRowTop">
            <Box className="promptsContainerBox">
              <Stack spacing={2}>


                <PromptCard title="Bakery Break-In"
                            genre="Mystery"
                            content="Detectives User 1, User 2, and User 3 are investigating a break-in at a bakery. The only thing missing? A very secret ingredient." />

                <PromptCard title="Fiery Rocks"
                            genre="Adventure"
                            content="A volcano suddenly erupted outside your window." />

                <PromptCard title="Dark Matter"
                            genre="Mystery"
                            content="On a daily walk, you come across a mysterious, glowing meteor... " />

                <PromptCard title="Wild At Heart"
                            genre="Adventure"
                            content="You've grown up in the big city, but you're longing for more... " />
              </Stack>
            </Box>
          </div>

      {/*
      <div className="promptsMenuRow" style={{ display: 'flex', 'justify-content': 'flex-start', width: '638px', 'margin-top':'20px', 'margin-left' : '0px' }}>

        <div className="addPromptButtonContainer"><span>
          <MUIButton
            className="promptAddIconButton"
            startIcon={<IconButton aria-label="add new prompt"><AddIcon fontSize="inherit" /></IconButton>}
            handleClick={() => {
            this.handleClick(this.state);}}
          >Add New Prompt</MUIButton>

        </span></div>

      </div>
      */}

      <div className="promptsMenuRow" style={{ display: 'flex', width: '100%', 'justify-content': 'flex-end' }}>

        <div className="promptsStarterButton" style={{ width:'340px', 'margin-right':"0px" }}>
            <UserInputField text="CREATE NEW PROMPT" id={1} handleClick={() => {
            this.handleClick(this.state);}}></UserInputField>
        </div>

        <div className="promptsStarterButton" style={{ width:'340px', 'margin-right':"12px" }}>
            <UserInputField text="CREATE NEW GENRE" id={2} handleClick={() => {
            this.handleClick(this.state);}}></UserInputField>
        </div>

      </div>

    </div>

    </span>
  </div>
    );
  }
}

export default AdminBrowsePrompts;
