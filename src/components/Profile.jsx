import React, { useState } from "react";
import "./styles/Profile.css";
import SearchResult from "./SearchResult";
import { Link } from "react-router-dom";

function Profile(props) {
  const [currentBookings, setCurrentBookings] = useState(true);
  const [previousBookings, setPreviousBookings] = useState(false);
  return (
    <div className="profile-page">
      <div className="side-bar">
        <h1>PeTra</h1>
        <img
          src="/mountain.png"
          alt="mountain"
          className="profile-picture"
        ></img>
        <h3>{props.location.props.Name}</h3>
        <div className="side-bar-items">
          <p>
            <Link to="/auth/google/account" className="back-btn">
              Back
            </Link>
          </p>
          <p>
            <Link to="/" className="sign-out-btn">
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
                <SearchResult
                  img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"
                  location="Private room in center of London"
                  title="Stay at this spacious Edwardian House"
                  description="1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine"
                  star={4.73}
                  price="£30 / night"
                  total="£117 total"
                />
                <SearchResult
                  img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"
                  location="Private room in center of London"
                  title="Stay at this spacious Edwardian House"
                  description="1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine"
                  star={4.73}
                  price="£30 / night"
                  total="£117 total"
                />
                <SearchResult
                  img="https://www.smartertravel.com/uploads/2017/07/Untitled-design-8.jpg"
                  location="Private room in center of London"
                  title="London Studio Apartments"
                  description="4 guest · 4 bedroom · 4 bed · 2 bathrooms · Free parking · Washing Machine"
                  star={3.8}
                  price="£35 / night"
                  total="£207 total"
                />
              </div>
            </div>
          ) : null}
          {previousBookings ? (
            <div>
              <h3 className="booking-type">Previous Bookings</h3>
              <div className="hotel-items current-bookings">
                <SearchResult
                  img="https://www.smartertravel.com/uploads/2017/07/Untitled-design-8.jpg"
                  location="Private room in center of London"
                  title="London Studio Apartments"
                  description="4 guest · 4 bedroom · 4 bed · 2 bathrooms · Free parking · Washing Machine"
                  star={3.8}
                  price="£35 / night"
                  total="£207 total"
                />
                <SearchResult
                  img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"
                  location="Private room in center of London"
                  title="Stay at this spacious Edwardian House"
                  description="1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine"
                  star={4.73}
                  price="£30 / night"
                  total="£117 total"
                />
                <SearchResult
                  img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"
                  location="Private room in center of London"
                  title="Stay at this spacious Edwardian House"
                  description="1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine"
                  star={4.73}
                  price="£30 / night"
                  total="£117 total"
                />
                <SearchResult
                  img="https://media.cntraveler.com/photos/5a8f258bd363c34048b35aac/master/w_2250,h_1500,c_limit/airbnb-plus-london.jpg"
                  location="Private room in center of London"
                  title="Spacious Peaceful Modern Bedroom"
                  description="3 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Free parking · Dry Cleaning"
                  star={5.0}
                  price="£60 / night"
                  total="£450 total"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Profile;
