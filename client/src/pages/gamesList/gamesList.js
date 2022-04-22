import AppName from "../../components/appName/appName.js";
import React from "react";
import Button from "../../components/button/button.js";
import UserIcon from "../../components/userIcon/userIcon.js";
import TextField from "@mui/material/TextField";
import "./gamesList.css";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import ContentCopy from "@mui/icons-material/ContentCopy";
import DoubleArrow from "@mui/icons-material/DoubleArrow";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getUser } from "../../actions/global/users.js";
import { getGames, joinGame } from "../../actions/gamesList/rooms.js";
import { copyToClipboard } from "../../actions/indivStory/loadStory.js";
import {
  joinRoom,
  updateRoom,
  denyRoomAccess,
  updateNumPlayers
} from "../../actions/sockets/room.js";
import { backButtonHandler } from "../../actions/router/render.js";
import { menuRedirect } from "../../actions/dashboard/menu.js";

class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/gamesList");
    backButtonHandler(this.props.app, this.props.history);
  }

  state = {
    rows: [
      {
        id: 0,
        host: "Random Name",
        players: "4/5",
        genre: "Adventure",
        roomcode: 231292
      }
    ],
    columns: [
      {
        field: "host",
        editable: false,
        type: "string",
        headerName: "Host",
        width: 200,
        headerAlign: "center",
        align: "center",
        headerClassName: "lastcolumnSeparator"
      },
      {
        field: "players",
        editable: false,
        type: "string",
        headerName: "Players",
        width: 100,
        headerAlign: "center",
        align: "center",
        headerClassName: "lastcolumnSeparator"
      },

      {
        field: "genre",
        editable: false,
        type: "string",
        headerName: "Genre",
        width: 100,
        headerAlign: "center",
        align: "center",
        headerClassName: "lastcolumnSeparator"
      },
      {
        field: "roomcode",
        editable: false,
        type: "number",
        headerName: "Room ID",
        width: 100,
        headerAlign: "center",
        align: "center",
        headerClassName: "lastcolumnSeparator"
      },
      {
        field: "divider",
        editable: false,
        type: "number",
        headerName: "",
        flex: 1,
        headerAlign: "center",
        align: "center",
        headerClassName: "lastcolumnSeparator"
      },
      {
        field: "copyID",
        editable: false,
        type: "actions",
        headerName: "Copy ID",
        width: 100,
        headerAlign: "center",
        align: "center",
        headerClassName: "lastcolumnSeparator",
        getActions: params => [
          <GridActionsCellItem
            icon={<ContentCopy />}
            label="Copy ID"
            onClick={() => {
              copyToClipboard(params.row.roomcode);
            }}
          />
        ]
      },
      {
        field: "join",
        editable: false,
        type: "actions",
        headerName: "Join",
        width: 100,
        headerAlign: "center",
        align: "center",
        headerClassName: "lastcolumnSeparator",
        getActions: params => [
          <GridActionsCellItem
            icon={<DoubleArrow />}
            label="Join"
            onClick={() => {
              joinRoom(this.state.user, params.row.roomcode);
            }}
          />
        ]
      }
    ],
    user: {
      username: "",
      icon: "avatar01.png",
      stories: []
    }
  };

  componentDidMount() {
    getUser(this, this.props.app);
    getGames(this);
    updateRoom(this.props.app);
    updateNumPlayers(this.props.app);
    denyRoomAccess();
  }

  render() {
    return (
      <div className="gamesList-new" style={{ height: "100%", width: "100%" }}>
        {" "}
        {/* TODO: Move in-line styling to CSS */}
        <div
          className="gamesListHeader"
          style={{ display: "flex", "justify-content": "center" }}
        >
          <AppName className="gamesHeader" />
        </div>
        <div className="gamesListBody">
          <div
            className="gamesListContainer"
            style={{
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              height: "100%",
              width: "100%"
            }}
          >
            <ArrowBackIosNewIcon
              sx={{ fontSize: 80, "padding-right": "100px" }}
              onClick={() => {
                menuRedirect(this.props.app, "dashboard");
              }}
            />

            <div
              className="gamesListGridDataContainer"
              style={{ display: "flex", height: "526px", width: "800px" }}
            >
              {/* experimentalFeatures required for certain props such as editable cells */}
              {/* columns prop disables sortable on divider col */}
              {/*  disableColumnMenu: disables additional column options (sorting, filtering, etc) */}
              {/* NOTE: There seems to be a pagination bug that makes editing very hard and error/warning-prone.
                          Modelling from the code provided at https://mui.com/components/data-grid/pagination/
                          the error never fails to manifest. Because of this, we have disabled pagination.
                          Side-effect: a console warning about [100] not being included in the rowsPerPageOptions. */}

              {/*
                {...initialRows}
                initialState={{
                  ...initialRows.initialState,
                  pagination: {
                    page: 1,
                  },
                }}
                pageSize={8}
                */}

              {/* loads 8 rows per page */}

              {/*  sets page size to 8 rows */}

              <DataGrid
                experimentalFeatures={{ newEditingApi: true }}
                rows={this.state.rows}
                columns={[
                  ...this.state.columns,
                  { field: "divider", sortable: false }
                ]}
                disableColumnMenu={true}
                rowsPerPageOptions={[0]}
                pagination
                initialState={{
                  pagination: {
                    pageSize: 8
                  }
                }}
                hideFooterSelectedRowCount={true}
                onCellEditStop={(params, event) => {
                  console.log("Edited cell:");
                  console.log(params);
                }}
              />
              {/* NOTE:     processRowUpdate={processRowUpdate} */
              /*  api call for processing updates to rows of Grid Data */}
            </div>

            <UserIcon
              icon={this.state.user.icon}
              username={this.state.user.username}
              style={{ "padding-left": "100px" }}
            />
          </div>
        </div>
        <div className="gamesListMenu" style={{ "padding-top": "25px" }}>
          <span className="user-login-input">
            <div className="user-input-fields">
              <TextField
                id="room-code"
                label="<ENTER ROOM-CODE>"
                variant="filled"
                margin="normal"
                maxRows="1"
                onKeyUp={event => {
                  if (event.key === "Enter") {
                    joinGame(this);
                  }
                }}
              />
            </div>

            <Button
              text="JOIN ROOM"
              handleClick={() => {
                joinGame(this);
              }}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default GamesList;
