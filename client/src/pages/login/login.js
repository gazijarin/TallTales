import React from "react";
import AppName from "../../components/appName/appName.js";
import UserLoginInput from "../../components/userLoginInput/userLoginInput.js";
import TextButton from "../../components/textButton/textButton.js";

import { login, register } from "../../actions/login/authenticate.js";
import { backButtonHandler } from "../../actions/router/render.js";

import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/login");
    backButtonHandler(this.props.app, this.props.history);
  }

  render() {
    // console.log(this.props.app.state)
    const handleClick = () => {
        login(this.props.app, this.props.app.state.users);
    }

    return (
      <div className="login-page">
        <div className="login-header">
          <AppName showTagline></AppName>
        </div>
        <UserLoginInput text="LOGIN" enterFunction={handleClick}></UserLoginInput>

        <TextButton
          text="<ENTER TO PLAY>"
          handleClick={handleClick}
        ></TextButton>
        <div className="signup-message">
          NEW? SIGN UP
            <strong className="signup-link" onClick={() => {register(this.props.app)}}>
              {" "}
              HERE.
            </strong>
        </div>
      </div>
    );
  }
}

export default Login;
