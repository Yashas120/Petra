import React from "react";
// import axios from "axios";
import "./styles/SignUp.css";

function SignUp() {
  return (
    <div className="signup-page">
      <div className="left-container">
        <h1>PeTra</h1>
        <p>Where journey begins.</p>
      </div>
      <div className="right-container">
        <p>Please sign up using the following option.</p>
        <div className="signup-button">
          <img className="google-btn" src="./google.svg" alt="google"></img>
          <p>Sign Up with Google</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
