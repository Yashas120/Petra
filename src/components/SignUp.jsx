import React from "react";
import axios from "axios";
import "./styles/SignUp.css";
import { useHistory, withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";

function SignUp(props) {
  const history = useHistory();
  const responseSuccess = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:3001/auth/google/account/",
      data: {
        tokenId: response.tokenId,
        googleId: response.googleId,
        imageUrl: response.profileObj.imageUrl,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          sessionStorage.setItem(
            "profile",
            JSON.stringify({
              pathname: "/auth/google/account",
              props: {
                name: response.data.user.name,
                emailID: response.data.user.email,
                perks: response.data.user.perks,
                imageUrl: response.data.user.imageUrl,
                LoggedIn: true,
              },
            })
          );
          history.push({
            pathname: "/auth/google/account",
            props: {
              name: response.data.user.name,
              emailID: response.data.user.email,
              perks: response.data.user.perks,
              imageUrl: response.data.user.imageUrl,
              LoggedIn: true,
            },
          });
        } else {
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const responseFailure = (response) => {
    alert("Something Went Wrong during Authentication!");
    history.push("/");
  };

  return (
    <div className="signup-page">
      <div className="left-container">
        <h1>PeTra</h1>
        <p>Where journey begins.</p>
      </div>
      <div className="right-container">
        <p>Please sign {props.type} using the following option.</p>
        <br />
        <br />
        <GoogleLogin
          clientId="1065157938718-eudu1eo9ic1l7dduroe3n85ffdthk9fp.apps.googleusercontent.com"
          buttonText={`Sign ${props.type} with Google`}
          onSuccess={responseSuccess}
          onFailure={responseFailure}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
