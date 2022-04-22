import React from "react";
import AppName from "../../components/appName/appName.js";
import Button from "../../components/button/button.js";
import DashboardMenu from "../../components/dashboardMenu/dashboardMenu.js";
import AdminMenu from "../../components/profileMenu/adminMenu.js";
import UserIcon from "../../components/userIcon/userIcon.js";
import "./dashboard.css";

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import Checkbox from '@mui/material/Checkbox';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';

import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import { backButtonHandler } from "../../actions/router/render.js";
import { errorToast } from "../../actions/toastify/toastify.js";
import { deleteUser, editUser, getUsers, resetPass } from "../../actions/admin/editUsers.js";
import { getUser } from "../../actions/global/users.js";

class AdminBrowseUsers extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/adminMenu");
    backButtonHandler(this.props.app, this.props.history);
  }

  state = {
    rows: [
      {
        id: 0,
        username: "",
        isAdmin: true
      }
    ],
    columns: [
      { field: 'username',      editable: true,  type: 'string',   headerName: 'Username',       width: 150, headerAlign: 'center', align: 'center', headerClassName: 'lastcolumnSeparator',
      preProcessEditCellProps: (params) => { /* validates username change */
        let hasError;
        if (params.props.value.length < 1) {           /*  Ensures that username can't be less than 1 character
                                                                      Not really needed anymore, leaving in for levity. */
          errorToast("Username can't be 0 characters!");               /* This needs to be a snack */
        } else if (params.row.username === 'admin' ) { /* Ensures admin can't be renamed */
          errorToast("Admin can't be renamed!");                       /* This needs to be a snack */
        }
        return {
          ...params.props, error: hasError
        };
      },
    },
    { field: 'isAdmin',       editable: true,  type: 'boolean',  headerName: 'Admin',          width: 100, headerAlign: 'center', align: 'center', headerClassName: 'lastcolumnSeparator',
      preProcessEditCellProps: (params) => { /* validates isAdmin change */
        const hasError = params.row.username === 'admin';         /*  Ensures that 'admin' user can't be demoted to regular user
                                                                      Not really needed anymore, leaving in for levity. */
        if(hasError) {
          errorToast("Admin can't be demoted!");                       /* This needs to be a snack */
        }
        return {
          ...params.props, error: hasError
        };
      },
    },
    { field: 'divider',       editable: false, type: 'number',   headerName: '',                flex:   1, headerAlign: 'center', align: 'center', headerClassName: 'lastcolumnSeparator' },
    { field: 'divider',       editable: false, type: 'number',   headerName: '',                flex:   1, headerAlign: 'center', align: 'center', headerClassName: 'lastcolumnSeparator' },
    { field: 'divider',       editable: false, type: 'number',   headerName: '',                flex:   1, headerAlign: 'center', align: 'center', headerClassName: 'lastcolumnSeparator' },
    { field: 'resetPassword', editable: false, type: 'actions',  headerName: 'Reset Pass',     width: 200, headerAlign: 'center', align: 'center', headerClassName: 'lastcolumnSeparator',
      getActions: (params) =>
      [ <GridActionsCellItem icon={<RestartAltIcon />} label="Reset Password" onClick={() => {resetPass(params.row.username);}} />, ], },
    { field: 'deleteUser',    editable: false, type: 'actions',  headerName: 'Delete User',    width: 200, headerAlign: 'center', align: 'center', headerClassName: 'lastcolumnSeparator',
      getActions: (params) =>
      [ <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => {deleteUser(params.row.username, this);}} />, ], }
    ],
    user: {
      username: "",
      icon: "avatar01.png",
      stories: []
    }
  }

  componentDidMount() {
    getUser(this, this.props.app);
    getUsers(this);
  }
  
  render() {
    return (
      <div className="dashboard">
        <span className="dashboardLeft">
          <div className="header">
            <AppName></AppName>
          </div>
            <AdminMenu></AdminMenu>
        </span>
  
        <span className="dashboardDivider">
        </span>
  
        <span className="dashboardRight">
  
        <div className="profileAvatarContainer">
          <UserIcon icon={this.state.user.icon} username={this.state.user.username} />
        </div>
  
        <div className="adminContent">
          <div style={{ display: 'flex', height: '100%',  width: '100%' }}>
            <div style={{ height: '526px', width:'100%' }}>  {/* used to be: 371px */}
              <DataGrid
  
                experimentalFeatures={{ newEditingApi: true }}  /*  required for certain props such as editable cells */
                rows={this.state.rows}
                columns={[...this.state.columns, {field: 'divider', sortable: false}]}            /* disables sorting on the divider column */
                disableColumnMenu={true}                        /*  disables additional column options (sorting, filtering, etc) */
                isCellEditable={(params) => params.row.id > 1}  /*  admin and user rows (ids 0, 1) are not editable.
                                                                    NOTE: This makes the alerts in delete user and
                                                                    reset password unnecessary but left them there for
                                                                    educational purposes */
  
                /* NOTE: There seems to be a pagination bug that makes editing very hard and error/warning-prone.
                          Modelling from the code provided at https://mui.com/components/data-grid/pagination/
                          the error never fails to manifest. Because of this, we have disabled pagination. */
  
                rowsPerPageOptions={[0]}
                /* Side-effect: a console warning about 100 not being included in the options. */
  
                // {...initialRows}
                // initialState={{
                //   ...initialRows.initialState,
                //   pagination: {
                //     page: 1,
                //   },
                // }}
                // pageSize={8}
                // rowsPerPageOptions={[8]}                        /*  loads 8 rows per page */
                // pagination
  
  
                // initialState={{                                 /*  sets page size to 8 rows */
                //   pagination: {
                //     pageSize: 8,
                //   },
                // }}
  
                hideFooterSelectedRowCount= {true}              /*  self-explanatory */
                startRowEditMode={(params) => {
                  console.log('test');
                  editUser(this, params);
                }}
                
                // onEditRowsModelChange={(params) => {
                //   editUser(this, params);
                // }}
              /* processRowUpdate={processRowUpdate} */         /*  api call for processing updates to rows */
              />
            </div>
          </div>
        </div>
  
        </span>
      </div>
    );
  }
}

export default AdminBrowseUsers;

// export const deleteUser = (id) => {

// }
//     (id) => () => {
//       if (id > 1) {
//         setTimeout(() => {
//           setRows((prevRows) => prevRows.filter((row) => row.id !== id));
//         });
//         console.log("Deleted user id: " + id);
//       } else {
//         console.log("Can't delete user id: " + id);
//       }
//     },
//     [],
//   );
  
//   const resetPassword = React.useCallback(
//     (id) => () => {
//       if (id > 1) {
//         console.log("Password reset for user id: " + id);
//       } else {
//         console.log("Can't reset for user id: " + id);
//       }
//     },
//     [],
//   );
