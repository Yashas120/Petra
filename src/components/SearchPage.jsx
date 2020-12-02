import React, { useEffect, useState } from "react";
import "./styles/searchPage.css";
import SearchResult from "./SearchResult";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { withRouter, useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

function SearchPage(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [propContents, setPropContents] = useState({});
  const [openPrice, setOpenPrice] = useState(false);
  const [priceValue, setPriceValue] = useState([0, 100]);
  const [openType, setOpenType] = useState(false);
  const [checkType, setCheckType] = useState([true, true, true]);
  const [openRating, setOpenRating] = useState(false);
  const [ratingValue, setRatingValue] = useState([0, 100]);

  useEffect(() => {
    async function loadData() {
      let temp = await JSON.parse(sessionStorage.getItem("searchPageProps"));
      setPropContents(temp);
      await setTimeout(async () => {
        console.log(propContents);
        if ("searchPageProps" in sessionStorage) {
          setLoading(true);
        } else {
          console.log("Redirecting");
          history.push("/");
        }
      }, 1000);
    }
    loadData();
  }, [loading]);

  function getLoc() {
    let latList = propContents.props.results.map((result) => {
      return result.coordinates.latitude;
    });
    let longList = propContents.props.results.map((result) => {
      return result.coordinates.longitude;
    });

    return [
      Math.max(...latList) * 0.5 + Math.min(...latList) * 0.5,
      Math.max(...longList) * 0.5 + Math.min(...longList) * 0.5,
    ];
  }

  return (
    <div>
      {loading ? (
        <div className="Wrapper">
          <div className="searchPage">
            <div
              className="petra-logo"
              onClick={() => {
                history.push("/");
              }}
            >
              PeTra
            </div>
            <div className="searchPage__info">
              <p>
                {propContents.props.results.length} stays in{" "}
                {propContents.props.searchLocation} · from{" "}
                {propContents.props.sdate} to {propContents.props.edate} ·{" "}
                {propContents.props.numberOfGuests} Guests ·{" "}
                {propContents.props.pets} Pet
              </p>
              <h1>Stays nearby</h1>
            </div>
            <div className="filters">
              <div
                className="price-filter"
                onClick={() => {
                  setOpenPrice(true);
                }}
              >
                Price
              </div>
              <Dialog
                disableEscapeKeyDown
                open={openPrice}
                onClose={() => {
                  setOpenPrice(false);
                }}
              >
                <DialogTitle>Price</DialogTitle>
                <DialogContent>
                  <div className="price-slider">
                    <Slider
                      value={priceValue}
                      onChange={(event, newValue) => {
                        setPriceValue(newValue);
                      }}
                      marks={[
                        { value: 0, label: "0" },
                        { value: 10, label: "2000" },
                        { value: 25, label: "5000" },
                        { value: 50, label: "10000" },
                        { value: 100, label: "20000" },
                      ]}
                      aria-labelledby="range-slider"
                      step={null}
                      getAriaValueText={(value) => {
                        return String(value * 200);
                      }}
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setOpenPrice(false);
                    }}
                    color="primary"
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
              <div
                className="type-filter"
                onClick={() => {
                  setOpenType(true);
                }}
              >
                Type
              </div>
              <Dialog
                disableEscapeKeyDown
                open={openType}
                onClose={() => {
                  setOpenType(false);
                }}
              >
                <DialogTitle>Type</DialogTitle>
                <DialogContent>
                  <div className="types-switches">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={checkType[0]}
                            onChange={() => {
                              setCheckType([
                                !checkType[0],
                                checkType[1],
                                checkType[2],
                              ]);
                            }}
                          />
                        }
                        label="Home"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={checkType[1]}
                            onChange={() => {
                              setCheckType([
                                checkType[0],
                                !checkType[1],
                                checkType[2],
                              ]);
                            }}
                          />
                        }
                        label="Hotel"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={checkType[2]}
                            onChange={() => {
                              setCheckType([
                                checkType[0],
                                checkType[1],
                                !checkType[2],
                              ]);
                            }}
                          />
                        }
                        label="Resort"
                      />
                    </FormGroup>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setOpenType(false);
                    }}
                    color="primary"
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
              <div
                className="rating-filter"
                onClick={() => {
                  setOpenRating(true);
                }}
              >
                Rating
              </div>
              <Dialog
                disableEscapeKeyDown
                open={openRating}
                onClose={() => {
                  setOpenRating(false);
                }}
              >
                <DialogTitle>Rating</DialogTitle>
                <DialogContent>
                  <div className="rating-slider">
                    <Slider
                      value={ratingValue}
                      onChange={(event, newValue) => {
                        setRatingValue(newValue);
                      }}
                      marks={[
                        { value: 0, label: "0" },
                        { value: 20, label: "1" },
                        { value: 40, label: "2" },
                        { value: 60, label: "3" },
                        { value: 80, label: "4" },
                        { value: 100, label: "5" },
                      ]}
                      aria-labelledby="range-slider"
                      step={null}
                      getAriaValueText={(value) => {
                        return String(value);
                      }}
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setOpenRating(false);
                    }}
                    color="primary"
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="search-results">
              {propContents.props.results.map((result) => {
                {
                  /* console.log(Number(result.star), Number(result.price)); */
                }
                if (
                  Number(result.star) <= ratingValue[1] / 20 &&
                  Number(result.star) >= ratingValue[0] / 20 &&
                  Number(result.price) <= priceValue[1] * 200 &&
                  Number(result.price) >= priceValue[0] * 200 &&
                  ((result.type === "HOME" && checkType[0]) ||
                    (result.type === "HOTEL" && checkType[1]) ||
                    (result.type === "RESORT" && checkType[2]))
                ) {
                  return (
                    <div
                      key={result.hotelID}
                      onClick={() => {
                        if (propContents.props.LoggedIn) {
                          sessionStorage.setItem(
                            "hotel",
                            JSON.stringify({
                              pathname:
                                "/auth/google/account/hotel/" + result.hotelID,
                              props: {
                                LoggedIn: propContents.props.LoggedIn,
                                hotelID: result.hotelID,
                                adults: propContents.props.adults,
                                childern: propContents.props.childern,
                                infants: propContents.props.infants,
                                pets: propContents.props.pets,
                                sdate: propContents.props.sdate,
                                edate: propContents.props.edate,
                              },
                            })
                          );
                          history.push({
                            pathname:
                              "/auth/google/account/hotel/" + result.hotelID,
                            props: {
                              LoggedIn: propContents.props.LoggedIn,
                              hotelID: result.hotelID,
                              adults: propContents.props.adults,
                              childern: propContents.props.childern,
                              infants: propContents.props.infants,
                              pets: propContents.props.pets,
                            },
                          });
                        } else {
                          sessionStorage.setItem(
                            "hotel",
                            JSON.stringify({
                              pathname:
                                "/auth/google/account/hotel/" + result.hotelID,
                              props: {
                                LoggedIn: propContents.props.LoggedIn,
                                hotelID: result.hotelID,
                                adults: propContents.props.adults,
                                childern: propContents.props.childern,
                                infants: propContents.props.infants,
                                pets: propContents.props.pets,
                                sdate: propContents.props.sdate,
                                edate: propContents.props.edate,
                              },
                            })
                          );
                          history.push({
                            pathname: "/hotel/" + result.hotelID,
                            props: {
                              LoggedIn: propContents.props.LoggedIn,
                              hotelID: result.hotelID,
                              adults: propContents.props.adults,
                              childern: propContents.props.childern,
                              infants: propContents.props.infants,
                              pets: propContents.props.pets,
                            },
                          });
                        }
                      }}
                    >
                      <SearchResult
                        key={result.hotelID}
                        id={result.hotelID}
                        img={result.img}
                        location={result.location}
                        title={result.title}
                        description={result.description}
                        star={result.star}
                        price={result.price}
                        total={result.total}
                        className="hotels"
                      ></SearchResult>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="Map-component">
            <MapContainer
              // center={propContents.props.coordinates}
              center={getLoc()}
              zoom={11}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {propContents.props.results.map((result) => {
                if (
                  Number(result.star) <= ratingValue[1] / 20 &&
                  Number(result.star) >= ratingValue[0] / 20 &&
                  Number(result.price) <= priceValue[1] * 200 &&
                  Number(result.price) >= priceValue[0] * 200 &&
                  ((result.type === "HOME" && checkType[0]) ||
                    (result.type === "HOTEL" && checkType[1]) ||
                    (result.type === "RESORT" && checkType[2]))
                ) {
                  return (
                    <Marker
                      position={[
                        result.coordinates.latitude,
                        result.coordinates.longitude,
                      ]}
                      key={result.hotelID}
                      id={result.hotelID}
                    >
                      <Popup>
                        <p
                          style={{
                            fontFamily: "PeTra-Font-Black",
                          }}
                        >
                          {result.location} <br></br>
                          &#8377;{result.price}/Night
                        </p>
                      </Popup>
                    </Marker>
                  );
                } else {
                  return null;
                }
              })}
            </MapContainer>
          </div>
        </div>
      ) : (
        <div className="loading-div">Loading</div>
      )}
    </div>
  );
}

export default withRouter(SearchPage);
