import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import PromptItemMenu from "../../components/promptItemMenu/promptItemMenu.js";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import React from "react";
import TextField from "@mui/material/TextField";


import "./promptCard.css";

class UserInputField extends React.Component {
  render() {
    const { title, genre, content } = this.props;
    return (
      <Card variant="outlined">
        <CardHeader style={{ textAlign: 'left' }}
          avatar={
            <Avatar sx={{ bgcolor: '#292929' }} aria-label="recipe">
              C {/* TODO: dynamically pick first letter of the title or something */}
            </Avatar>
          }
          action={ <PromptItemMenu /> }
          title= {this.props.title}
          subheader={"Genre: " + this.props.genre}
        />
        <CardContent>
          <Typography style={{ textAlign: 'left' }} variant="body2" color="text.secondary">
            {this.props.content}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
export default UserInputField;
