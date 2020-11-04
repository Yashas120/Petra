import React, { useState } from "react";
import axios from "axios";
import "./styles/SignUp.css";
import { Redirect } from "react-router-dom";

function SignUp(props) {
  const [LoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="signup-page">
      <div className="left-container">
        <h1>PeTra</h1>
        <p>Where journey begins.</p>
      </div>
      <div className="right-container">
        <p>Please sign {props.type} using the following option.</p>
        <div
          className="signup-button"
          onClick={() => {
            axios
              .get("http://localhost:3001/auth/google/user/")
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
            setLoggedIn(true);
          }}
        >
          <img className="google-btn" src="./google.svg" alt="google"></img>
          <p>Sign {props.type} with Google</p>
          {LoggedIn ? <Redirect to="/auth/google/account"></Redirect> : null}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
