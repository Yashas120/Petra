import React, { useEffect, useState } from "react";
import "./styles/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SubIcon from "@material-ui/icons/Remove";
import Clear from "@material-ui/icons/ClearRounded";
import Hamburger from "@material-ui/icons/MenuRounded";
import DatePicker from "./DatePicker";
import axios from "axios";
import { Link } from "react-router-dom";

function Header() {
  const [showDiv, setShowDiv] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [adultNumber, setAdultNumber] = useState(0);
  const [childernNumber, setChildernNumber] = useState(0);
  const [infantNumber, setInfantNumber] = useState(0);
  const [petNumber, setPetNumber] = useState(0);
  const [searchValue, setSearchValue] = useState([
    "Banaglore, India",
    "Mysore, India",
    "Mumbai, India",
    "Delhi, India",
    "Chennai, India",
  ]);
  const [showProfileDiv, setShowProfileDiv] = useState(false);
  const [showLangDiv, setShowLangDiv] = useState(false);

  useEffect(() => {
    // axios
    //   .get(`http://localhost:3000/`)
    //   .then((response) => {
    //     // console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // Not working
  });

  return (
    <div className="header">
      <section className="Nav-bar">
        <span className="Header-brand">PeTra</span>
        <div className="header-right">
          <div
            className="language-div"
            onClick={() => {
              if (!showLangDiv) {
                setShowLangDiv(true);
                if (showProfileDiv) setShowProfileDiv(false);
              } else setShowLangDiv(false);
            }}
          >
            <div>
              <LanguageIcon className="globe"></LanguageIcon>
              <ExpandMoreIcon className="Expand-more"></ExpandMoreIcon>
            </div>
          </div>
          {showLangDiv ? (
            <div className="lang-div">
              <LanguageIcon></LanguageIcon>
              <p>English (IN)</p>
            </div>
          ) : null}
          <div
            className="profile"
            onClick={() => {
              if (!showProfileDiv) {
                setShowProfileDiv(true);
                if (showLangDiv) setShowLangDiv(false);
              } else {
                setShowProfileDiv(false);
              }
            }}
          >
            <Hamburger className="menu-icon"></Hamburger>
            <Avatar className="profile-photo"></Avatar>
          </div>
          {showProfileDiv ? (
            <div className="profile-div">
              <p>
                <Link to="/signup">
                  <span className="login-signup-link">Sign Up</span>
                </Link>
              </p>
              <p>
                <Link to="/login">
                  <span className="login-signup-link">Log in</span>
                </Link>
              </p>
            </div>
          ) : null}
        </div>
      </section>
      <section className="Search-Bar">
        <form>
          <div className="Bar">
            <div
              className="location"
              onClick={() => {
                document.querySelector(".location-input").focus();
              }}
            >
              <p>Location</p>
              <input
                type="text"
                className="location-input"
                placeholder="Where are you going?"
                onChange={() => {
                  if (document.querySelector(".location-input").value !== "")
                    setShowSearchSuggestions(true);
                  else setShowSearchSuggestions(false);
                }}
              ></input>
              {showSearchSuggestions ? (
                <Clear
                  onClick={() => {
                    document.querySelector(".location-input").value = "";
                    setShowSearchSuggestions(false);
                  }}
                ></Clear>
              ) : null}
            </div>
            <div className="Check-in">
              <p>Check In</p>
              <DatePicker date={new Date()}></DatePicker>
            </div>
            <div className="Check-out">
              <p>Check Out</p>
              <DatePicker date={null}></DatePicker>
            </div>
            <div
              className="Guest-count"
              onClick={() => {
                if (!showDiv) {
                  setShowDiv(true);
                } else {
                  setShowDiv(false);
                }
              }}
            >
              <p>Guests</p>
              <span className="add-guest-span">Add guests</span>
            </div>
            <div className="search-icon">
              <SearchIcon></SearchIcon>
            </div>
          </div>
        </form>
        {showSearchSuggestions ? (
          <div className="search-suggestions">
            {searchValue.map((suggestions, index) => {
              return (
                <div
                  className="suggestion-items"
                  id={index}
                  onClick={() => {
                    document.querySelector(
                      ".location-input"
                    ).value = suggestions;
                    setShowSearchSuggestions(false);
                  }}
                >
                  {suggestions}
                </div>
              );
            })}
          </div>
        ) : null}
        {showDiv ? (
          <div className="guest-menu">
            <div className="guest-menu-adult">
              <p>Adults</p>
              <div className="number-icon">
                {(adultNumber !== 0 &&
                  !(
                    (childernNumber >= 1 || infantNumber >= 1) &&
                    adultNumber === 1
                  )) ||
                (adultNumber >= 1 &&
                  infantNumber === 0 &&
                  childernNumber === 0) ? (
                  <div className="Sub-icon">
                    <SubIcon
                      onClick={() => {
                        setAdultNumber((prevState) => {
                          return prevState - 1;
                        });
                      }}
                    ></SubIcon>
                  </div>
                ) : null}
                <p>{adultNumber}</p>
                <div className="plus-icon">
                  <AddIcon
                    onClick={() => {
                      setAdultNumber((prevState) => {
                        return prevState + 1;
                      });
                    }}
                  ></AddIcon>
                </div>
              </div>
            </div>
            <div className="guest-menu-childern">
              <p>Childern</p>
              <div className="number-icon">
                {childernNumber >= 1 && adultNumber > 0 ? (
                  <div className="Sub-icon">
                    <SubIcon
                      onClick={() => {
                        setChildernNumber((prevState) => {
                          return prevState - 1;
                        });
                      }}
                    ></SubIcon>
                  </div>
                ) : null}
                <p>{childernNumber}</p>

                {childernNumber >= 0 && adultNumber >= 1 ? (
                  <div className="plus-icon">
                    <AddIcon
                      onClick={() => {
                        setChildernNumber((prevState) => {
                          return prevState + 1;
                        });
                      }}
                    ></AddIcon>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="guest-menu-infant">
              <p>Infants</p>
              <div className="number-icon">
                {infantNumber >= 1 && adultNumber > 0 ? (
                  <div className="Sub-icon">
                    <SubIcon
                      onClick={() => {
                        setInfantNumber((prevState) => {
                          return prevState - 1;
                        });
                      }}
                    ></SubIcon>
                  </div>
                ) : null}
                <p>{infantNumber}</p>
                {infantNumber >= 0 && adultNumber >= 1 ? (
                  <div className="plus-icon">
                    <AddIcon
                      onClick={() => {
                        setInfantNumber((prevState) => {
                          return prevState + 1;
                        });
                      }}
                    ></AddIcon>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="guest-menu-pet">
              <p>Pets</p>
              <div className="number-icon">
                {petNumber >= 1 && adultNumber >= 0 ? (
                  <div className="Sub-icon">
                    <SubIcon
                      onClick={() => {
                        setPetNumber((prevState) => {
                          return prevState - 1;
                        });
                      }}
                    ></SubIcon>
                  </div>
                ) : null}
                <p>{petNumber}</p>
                {petNumber >= 0 && adultNumber >= 0 ? (
                  <div className="plus-icon">
                    <AddIcon
                      onClick={() => {
                        setPetNumber((prevState) => {
                          return prevState + 1;
                        });
                      }}
                    ></AddIcon>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <section className="header-img">
        <img
          src="/mountain.png"
          alt="mountain-img"
          className="header-image"
          onClick={() => {
            if (showDiv) {
              setShowDiv(false);
            }
            if (showSearchSuggestions) {
              setShowSearchSuggestions(false);
            }
            if (showProfileDiv) {
              setShowProfileDiv(false);
            }
            if (showLangDiv) {
              setShowLangDiv(false);
            }
          }}
        ></img>
      </section>
    </div>
  );
}

export default Header;
