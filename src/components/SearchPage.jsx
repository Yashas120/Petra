import React, { useEffect, useState } from "react";
import "./styles/searchPage.css";
import SearchResult from "./SearchResult";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { withRouter, useHistory } from "react-router-dom";

function SearchPage(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [propContents, setPropContents] = useState({});

  useEffect(() => {
    async function loadData() {
      let temp = await JSON.parse(sessionStorage.getItem("props"));
      setPropContents(temp);
      await setTimeout(async () => {
        console.log(propContents);
        if ("props" in sessionStorage) {
          setLoading(true);
        } else {
          console.log("Redirecting");
          history.push("/");
        }
      }, 1000);
    }
    loadData();
  }, [loading]);
  return (
    <div>
      {loading ? (
        <div className="Wrapper">
          <div className="searchPage">
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
            <div className="search-results">
              {propContents.props.results.map((result) => {
                return (
                  <div
                    key={result.hotelID}
                    onClick={() => {
                      if (propContents.props.LoggedIn)
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
                      else {
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
              })}
            </div>
          </div>
          <div className="Map-component">
            <MapContainer
              center={propContents.props.coordinates}
              zoom={10}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {propContents.props.results.map((result) => {
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
                      {result.location} <br></br>
                      {result.price}
                    </Popup>
                  </Marker>
                );
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
