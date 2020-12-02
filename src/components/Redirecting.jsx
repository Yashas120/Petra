import React, { useState, useEffect } from "react";
import "./styles/Redirecting.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
function Redirecting() {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(true);
  const timer = 3 + Math.floor(Math.random() * 3);
  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    if (seconds >= timer) {
      setActive(false);
    }
    return () => clearInterval(interval);
  }, [timer, seconds]);

  const cond = () => {
    if (active) {
      return (
        <div>
          <div class="Redirecting-body">
            <span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
            <div class="base">
              <span></span>
              <div class="face"></div>
            </div>
          </div>
          <div class="longfazers">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1>Redirecting ....</h1>
        </div>
      );
    } else {
      return (
        <div class="thank">
          <h1 className="thank-h1">Thank you for Booking with us</h1>
          <Link to="/">
            <button id="homepage" type="button">
              Homepage
            </button>
          </Link>

          <Link
            to={{
              pathname: "/account",
              props: {
                Name: "Vishal R",
              },
            }}
          >
            <button id="account" type="button">
              {" "}
              Account
            </button>
          </Link>
        </div>
      );
    }
  };
  return <div>{cond()}</div>;
}
export default Redirecting;
