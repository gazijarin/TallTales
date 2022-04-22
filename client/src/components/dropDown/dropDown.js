import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./dropDown.css";
import { getUser } from "../../actions/global/users.js";
import { joinRoom, updateRoom } from "../../actions/sockets/room";

class DropDown extends React.Component {
  state = {
    selected: "",
    user: {
      username: "",
      icon: "avatar01.png",
      stories: []
    }
  };

  componentDidMount() {
    getUser(this, this.props.app);
    updateRoom(this.props.app);
  }

  render() {
    const items = this.props.items;
    const label = this.props.label ? this.props.label : "<SELECT GENRE>";

    const handleChange = event => {
      this.setState({ selected: event.target.value });

      // console.log(this.props.app.state.page)

      if (this.state.user) {
        // User and room emit
        joinRoom(this.state.user, event.target.value);
      }
    };

    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={this.state.selected}
          label={label}
          onChange={handleChange}
        >
          {" "}
          {items.map(item => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default DropDown;


{/*
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import "./dropDown.css";

class DropDown extends React.Component {
  constructor() {
    super();
    this.state = {
      genre: ""
    };
  }

  render() {
    const { items } = this.props;

    const handleChange = event => {
      this.setState({ genre: event.target.value });
    };

    return (
      <FormControl fullWidth>
        <InputLabel>{"<GENRE>"}</InputLabel>
        <Select
          value={this.state.genre}
          label="<GENRE>"
          onChange={handleChange}
        >
          {" "}
          {items.map(item => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default DropDown;*/}
