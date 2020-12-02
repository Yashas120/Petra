import React from "react";
import "./styles/NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  const img_url = "./sad" + (1 + Math.floor((Math.random() * 10) % 3)) + ".jpg";
  const names = ["Vishal", "Vijay", "Yashas"];
  const name = names[Math.floor((Math.random() * 10) % 3)];
  return (
    <div className="main_body" style={{ backgroundImage: `url(${img_url})` }}>
      <div className="center_body">
        <h1 id='nfh1'>SORRY!</h1>
        <h2 id='nfh2'>Looks like {name} got too lazy </h2>
        <p id='nfp'>to develop this page...</p>

          <Link to="/"><button id="notfound_home" type='button'>Go to Homepage</button></Link>
      </div>
    </div>
  );
}

export default NotFound;
