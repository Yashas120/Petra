import React, { useState } from "react";
import "./styles/Profile.css";
import SearchResult from "./SearchResult";
import { Link, useHistory, withRouter } from "react-router-dom";

function Profile(props) {
  const [currentBookings, setCurrentBookings] = useState(true);
  const [previousBookings, setPreviousBookings] = useState(false);
  const history = useHistory();
  if (!("profile" in sessionStorage)) {
    history.push("/");
  }

  return (
    <div className="profile-page">
      <div className="side-bar">
        <div
          className="petra-logo-profile"
          onClick={() => {
            history.push("/");
          }}
        >
          PeTra
        </div>
        <img
          src={JSON.parse(sessionStorage.getItem("profile")).props.imageUrl}
          alt="profile"
          className="profile-picture"
        ></img>
        <h3>{JSON.parse(sessionStorage.getItem("profile")).props.name}</h3>
        <div className="side-bar-items">
          <p>
            Perks : {JSON.parse(sessionStorage.getItem("profile")).props.perks}
          </p>
          <p>
            <Link
              to={{
                pathname: "/auth/google/account",
                props: {
                  name: JSON.parse(sessionStorage.getItem("profile")).props
                    .name,
                  imageUrl: JSON.parse(sessionStorage.getItem("profile")).props
                    .imageUrl,
                  perks: JSON.parse(sessionStorage.getItem("profile")).props
                    .perks,
                  LoggedIn: true,
                },
              }}
              className="back-btn"
            >
              Back
            </Link>
          </p>
          <p>
            <Link
              to="/"
              className="sign-out-btn"
              onClick={() => {
                sessionStorage.removeItem("profile");
                sessionStorage.removeItem("searchPageProps");
                sessionStorage.removeItem("hotel");
              }}
            >
              Sign Out
            </Link>
          </p>
          <p>
            <Link
              to="/auth/google/delete/account"
              className="close-account-btn"
            >
              Close Account
            </Link>
          </p>
        </div>
      </div>
      <div className="right-container-account">
        <div className="tabs">
          <div
            className="tab-items"
            onClick={() => {
              if (!currentBookings) {
                setPreviousBookings(false);
                setCurrentBookings(true);
              }
            }}
          >
            <p>Current Bookings</p>
          </div>
          <div
            className="tab-items"
            onClick={() => {
              if (!previousBookings) {
                setCurrentBookings(false);
                setPreviousBookings(true);
              }
            }}
          >
            <p>Previous Bookings</p>
          </div>
        </div>
        <div className="booking-list">
          {currentBookings ? (
            <div>
              <h3 className="booking-type">Current Bookings</h3>
              <div className="hotel-items current-bookings">
                <p>No Current Bookings Available!</p>
              </div>
            </div>
          ) : null}
          {previousBookings ? (
            <div>
              <h3 className="booking-type">Previous Bookings</h3>
              <div className="hotel-items current-bookings">
                <p>No Previous Bookings Available!</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Profile);
