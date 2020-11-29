import React from "react";
import "./styles/Home.css";
import Card from "./Card";
import { withRouter } from "react-router-dom";
import Masonry from "react-masonry-component";
import Gallery from "react-photo-gallery";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

function Home() {
  let images = [
    {
      src: "http://localhost:3001/Hotels/Bangalore/sitter/Hotel2-sitter2.jpg",
      width: 2,
      height: 2,
    },
    {
      src: "http://localhost:3001/Hotels/Bangalore/spa/Hotel1-spa4.jpg",
      width: 1,
      height: 1,
    },
    {
      src: "http://localhost:3001/Hotels/Bangalore/spa/Hotel1-spa1.jpg",
      width: 1,
      height: 1,
    },
    {
      src: "http://localhost:3001/Hotels/Bangalore/spa/Hotel4-spa3.jpg",
      width: 1,
      height: 1,
    },
    {
      src: "http://localhost:3001/Hotels/Bangalore/spa/Hotel1-spa5.jpg",
      width: 1,
      height: 1,
    },
  ];
  return (
    <div className="home">
      <div className="home__section">
        <Card
          src="https://a0.muscache.com/im/pictures/15159c9c-9cf1-400e-b809-4e13f286fa38.jpg?im_w=720"
          title="Unique stays"
          description="Spaces that are more than just a place to sleep."
        />
        <Card
          src="https://a0.muscache.com/im/pictures/fdb46962-10c1-45fc-a228-d0b055411448.jpg?im_w=720"
          title="Entire homes"
          description="Comfortable private places, with room for friends or family."
        />
      </div>
      <div className="home__section">
        <Card
          src="http://localhost:3001/Hotels/Chennai/images/Hotel5-1.jpg"
          title="Taj Hotel"
          description="Superhost with a lots of different amenities and a great place for shopping"
        />
        <Card
          src="http://localhost:3001/Hotels/Bangalore/images/Hotel5-1.jpg"
          title="Four Seasons Hotel"
          description="Enjoy the amazing sights of Bangalore with this stunning penthouse"
        />
        <Card
          src="http://localhost:3001/Hotels/Chennai/images/Hotel6-1.jpg"
          title="Taj Fisherman"
          description="Superhost with great amenities and a fabulous view of the beachside in Chennai"
        />
      </div>
      <div className="pets_section">
        <div className="left-pane-pets">
          <Gallery photos={images} className="images"></Gallery>
        </div>
        <div className="right-pane-pets">
          <h1>Travelling with Pets?</h1>
          <p>No Worries! </p> <br></br>
          <p>
            We have all the necessary arrangements to make your vacation even
            more amazing!
          </p>
          <br></br>
          <p>
            Each stay comes with a sitter and a spa for your pet. We will take
            good care of your pets while you are away enjoying the sunset on the
            beach.
          </p>
        </div>
      </div>
      <div className="cta">
        <h3>Reach Out to Us On</h3>
        <div className="social-icons">
          <InstagramIcon></InstagramIcon>
          <FacebookIcon></FacebookIcon>
          <TwitterIcon></TwitterIcon>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Home);
