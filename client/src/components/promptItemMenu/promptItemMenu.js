import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function PromptItemMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
    console.log(event.currentTarget.name);
  };
  const handleClose = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(null);
  };

  return (
    <div>

      <IconButton
        aria-label="options"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        name="promptItemMenu"
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem name="editTitle" onClick={handleClose}>Edit Title</MenuItem>
        <MenuItem name="editContent" onClick={handleClose}>Edit Content</MenuItem>
        <MenuItem name="delete" onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
