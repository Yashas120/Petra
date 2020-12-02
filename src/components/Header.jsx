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
import { Link, useHistory, withRouter } from "react-router-dom";

function Header(props) {
  const [showDiv, setShowDiv] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [adultNumber, setAdultNumber] = useState(
    "searchPageProps" in sessionStorage
      ? JSON.parse(sessionStorage.getItem("searchPageProps")).props.adults
      : 0
  );
  const [childernNumber, setChildernNumber] = useState(
    "searchPageProps" in sessionStorage
      ? JSON.parse(sessionStorage.getItem("searchPageProps")).props.childern
      : 0
  );
  const [infantNumber, setInfantNumber] = useState(
    "searchPageProps" in sessionStorage
      ? JSON.parse(sessionStorage.getItem("searchPageProps")).props.infants
      : 0
  );
  const [petNumber, setPetNumber] = useState(
    "searchPageProps" in sessionStorage
      ? JSON.parse(sessionStorage.getItem("searchPageProps")).props.pets
      : 0
  );
  const [searchQuery, setSearchQuery] = useState(
    "searchPageProps" in sessionStorage
      ? JSON.parse(sessionStorage.getItem("searchPageProps")).props.Query
      : ""
  );
  const [searchValue, setSearchValue] = useState([
    "Bangalore, India",
    "Chennai, India",
    "Mumbai, India",
  ]);
  const [sdate, setsdate] = useState(new Date());
  const [edate, setedate] = useState(
    new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
  );
  const [tempSearchValue, setTempSearchValue] = useState([]);
  const [showProfileDiv, setShowProfileDiv] = useState(false);
  const [showLangDiv, setShowLangDiv] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if ("profile" in sessionStorage) {
      setIsLoggedIn(
        JSON.parse(sessionStorage.getItem("profile")).props.LoggedIn
      );
      history.push("/auth/google/account");
    } else {
      history.push("/");
    }
    if ("hotel" in sessionStorage) sessionStorage.removeItem("hotel");
  }, [isLoggedIn]);

  function handleSearch() {
    const data = {
      Query: searchQuery,
      SDate: document.querySelectorAll("#date-picker")[0].value,
      EDate: document.querySelectorAll("#date-picker")[1].value,
      Guests: adultNumber + childernNumber + infantNumber + petNumber,
      Adults: adultNumber,
      Childern: childernNumber,
      Infants: infantNumber,
      Pets: petNumber,
      LoggedIn: isLoggedIn,
    };

    if (!isLoggedIn)
      axios
        .post("http://localhost:3001/search/", data)
        .then((response) => {
          const results = response.data.results;
          let pos = [];
          if (searchQuery === "Chennai, India") pos = [13.0474878, 80.1689252];
          else if (searchQuery === "Bangalore, India")
            pos = [12.971599, 77.594566];
          sessionStorage.setItem(
            "searchPageProps",
            JSON.stringify({
              pathname: "/search",
              props: {
                searchLocation: `${
                  searchQuery === "" ? "Nearby" : searchQuery
                }`,
                numberOfGuests: adultNumber + childernNumber + infantNumber,
                sdate: document.querySelectorAll("#date-picker")[0].value,
                edate: document.querySelectorAll("#date-picker")[1].value,
                adults: adultNumber,
                infants: infantNumber,
                childern: childernNumber,
                pets: petNumber,
                results: results,
                LoggedIn: isLoggedIn,
                coordinates: pos,
              },
            })
          );
          history.push({
            pathname: "/search",
            props: {
              searchLocation: `${searchQuery === "" ? "Nearby" : searchQuery}`,
              numberOfGuests: adultNumber + childernNumber + infantNumber,
              sdate: document.querySelectorAll("#date-picker")[0].value,
              edate: document.querySelectorAll("#date-picker")[1].value,
              adults: adultNumber,
              infants: infantNumber,
              childern: childernNumber,
              pets: petNumber,
              results: results,
              LoggedIn: isLoggedIn,
              coordinates: pos,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    else {
      axios
        .post("http://localhost:3001/auth/google/account/search/", data)
        .then((response) => {
          const results = response.data.results;
          let pos = [];
          if (searchQuery === "Chennai, India") pos = [13.0474878, 80.1689252];
          else if (searchQuery === "Bangalore, India")
            pos = [12.971599, 77.594566];
          sessionStorage.setItem(
            "searchPageProps",
            JSON.stringify({
              pathname: "/auth/google/account/search",
              props: {
                searchLocation: `${
                  searchQuery === "" ? "Nearby" : searchQuery
                }`,
                numberOfGuests: adultNumber + childernNumber + infantNumber,
                sdate: document.querySelectorAll("#date-picker")[0].value,
                edate: document.querySelectorAll("#date-picker")[1].value,
                adults: adultNumber,
                infants: infantNumber,
                childern: childernNumber,
                pets: petNumber,
                results: results,
                LoggedIn: isLoggedIn,
                coordinates: pos,
              },
            })
          );
          history.push({
            pathname: "/auth/google/account/search",
            props: {
              searchLocation: `${searchQuery === "" ? "Nearby" : searchQuery}`,
              numberOfGuests: adultNumber + childernNumber + infantNumber,
              sdate: document.querySelectorAll("#date-picker")[0].value,
              edate: document.querySelectorAll("#date-picker")[1].value,
              adults: adultNumber,
              infants: infantNumber,
              childern: childernNumber,
              pets: petNumber,
              results: results,
              LoggedIn: isLoggedIn,
              coordinates: pos,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

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
            {isLoggedIn ? (
              <Avatar
                className="profile-photo"
                src={
                  JSON.parse(sessionStorage.getItem("profile")).props.imageUrl
                }
              ></Avatar>
            ) : (
              <Avatar className="profile-photo"></Avatar>
            )}
          </div>
          {showProfileDiv && !isLoggedIn ? (
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
          {showProfileDiv && isLoggedIn ? (
            <div className="profile-div">
              <p>
                <Link
                  to={{
                    pathname: "/profile",
                    props: {
                      name: JSON.parse(sessionStorage.getItem("profile")).props
                        .name,
                      imageUrl: JSON.parse(sessionStorage.getItem("profile"))
                        .props.imageUrl,
                      perks: JSON.parse(sessionStorage.getItem("profile")).props
                        .perks,
                    },
                  }}
                >
                  <span className="login-signup-link">Profile</span>
                </Link>
              </p>
              <p>
                <Link
                  to="/"
                  onClick={() => {
                    sessionStorage.removeItem("profile");
                    sessionStorage.removeItem("searchPageProps");
                    sessionStorage.removeItem("hotel");
                    setIsLoggedIn(false);
                    setShowProfileDiv(false);
                  }}
                >
                  <span className="login-signup-link">Sign Out</span>
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
                  let temp = searchValue.filter((suggestions) => {
                    if (
                      suggestions
                        .toLowerCase()
                        .indexOf(
                          `${document
                            .querySelector(".location-input")
                            .value.toLowerCase()}`
                        ) > -1
                    )
                      return suggestions;
                    return null;
                  });
                  if (
                    document
                      .querySelector(".location-input")
                      .value.toLowerCase()
                      .indexOf("b") < 0 &&
                    document
                      .querySelector(".location-input")
                      .value.toLowerCase()
                      .indexOf("c") < 0 &&
                    document
                      .querySelector(".location-input")
                      .value.toLowerCase()
                      .indexOf("m")
                  )
                    setTempSearchValue([
                      "We are still expanding our offerings!",
                    ]);
                  else setTempSearchValue(temp);
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
            <div
              className="Check-in"
              onClick={() => {
                setsdate(() => {
                  return new Date(
                    document.querySelectorAll("#date-picker")[0].value
                  );
                });
              }}
            >
              <p>Check In</p>
              <DatePicker
                date={`${
                  "searchPageProps" in sessionStorage
                    ? new Date(
                        JSON.parse(
                          sessionStorage.getItem("searchPageProps")
                        ).props.sdate
                      )
                    : new Date()
                }`}
                // maxDate={new Date(edate.getTime() - 1000 * 60 * 60 * 24)}
              ></DatePicker>
            </div>
            <div
              className="Check-out"
              onClick={() => {
                setedate(() => {
                  return new Date(
                    document.querySelectorAll("#date-picker")[1].value
                  );
                });
              }}
            >
              <p>Check Out</p>
              <DatePicker
                date={`${
                  "searchPageProps" in sessionStorage
                    ? new Date(
                        JSON.parse(
                          sessionStorage.getItem("searchPageProps")
                        ).props.edate
                      )
                    : new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
                }`}
                minDate={new Date(sdate.getTime() + 1000 * 60 * 60 * 24)}
              ></DatePicker>
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
            <div className="search-icon" onClick={handleSearch}>
              <SearchIcon></SearchIcon>
            </div>
          </div>
        </form>
        {showSearchSuggestions && tempSearchValue.length > 0 ? (
          <div className="search-suggestions">
            {tempSearchValue.map((suggestions, index) => {
              return (
                <div
                  className="suggestion-items"
                  id={index}
                  key={index}
                  onClick={() => {
                    if (
                      suggestions !== "We are still expanding our offerings!"
                    ) {
                      document.querySelector(
                        ".location-input"
                      ).value = suggestions;
                      setSearchQuery(suggestions);
                      setShowSearchSuggestions(false);
                    } else {
                      document.querySelector(".suggestion-items").style.cursor =
                        "default";
                    }
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

export default withRouter(Header);
