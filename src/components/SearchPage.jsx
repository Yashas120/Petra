import React from "react";
import "./styles/searchPage.css";
import SearchResult from "./SearchResult";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { withRouter, useHistory } from "react-router-dom";

function SearchPage(props) {
  const position = [12.971599, 77.594566];
  const history = useHistory();

  return (
    <div className="Wrapper">
      <div className="searchPage">
        <div className="searchPage__info">
          <p>
            {props.location.props.results.length} stays in{" "}
            {props.location.props.searchLocation} · from{" "}
            {props.location.props.sdate} to {props.location.props.edate} ·{" "}
            {props.location.props.numberOfGuests} Guests ·{" "}
            {props.location.props.pets} Pet
          </p>
          <h1>Stays nearby</h1>
        </div>
        <div className="search-results">
          {props.location.props.results.map((result) => {
            return (
              <div
                key={result.hotelID}
                onClick={() => {
                  if (props.location.props.LoggedIn)
                    history.push({
                      pathname: "/auth/google/account/hotel/" + result.hotelID,
                      props: {
                        LoggedIn: props.location.props.LoggedIn,
                        hotelID: result.hotelID,
                      },
                    });
                  else {
                    history.push({
                      pathname: "/hotel/" + result.hotelID,
                      props: {
                        LoggedIn: props.location.props.LoggedIn,
                        hotelID: result.hotelID,
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
        <MapContainer center={position} zoom={11} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {props.location.props.results.map((result) => {
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
  );
}

export default withRouter(SearchPage);
