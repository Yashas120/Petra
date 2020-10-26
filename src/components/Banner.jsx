import React, { useState } from "react";
import "./styles/Banner.css";
import Search from "./Search";
import { Button } from "@material-ui/core";

function Banner() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="banner">
      {/* <div className="banner__search">
        {showSearch && <Search />}
        <Button
          onClick={() => setShowSearch(!showSearch)}
          className="banner__searchButton"
          variant="outlined"
        >
          {showSearch ? "Hide" : "Search Dates"}
        </Button>
      </div> */}
      <div className="banner__info">
        <h1>Imagination</h1>
        <h5>PLAN A DIFFERNET KIND OF GETAWAY TO UNCOVER THE HIDDEN GEMS</h5>
        <Button variant="outlined">Explore Nearby</Button>
      </div>
    </div>
  );
}

export default Banner;
