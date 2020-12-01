import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Landing from "./components/Landing"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import NotFound from "./components/NotFound";
import Hotel from './components/Product';
import Redirecting from './components/Redirecting'

function Preload(props){
  return props.isLanding ? (
    <div className='landing'>
      <Landing />
    </div>): null;
}
function App() {
  const [showLand, setShowLand] = useState(true);
  function Landed(){
    const homepage = document.querySelector('.homepage');
    const landing = document.querySelector('.landing');
    var count =0;
    if(showLand){
      landing.addEventListener('animationend',function(){
      if(count >= 5){
        landing.classList.add('landingfinish');
        landing.style.backgroundColor= 'white';
       homepage.classList.add('homepage_ready');
        setShowLand(false);
      }
      else count++;
      });
    }
    else{
        homepage.style.visibility='visible';
        homepage.style.opacity = 1;
        homepage.style.backgroundColor = 'white';
        homepage.style.pointerEvents = 'initial';
    }
   
  }

  return (
    <div className="App">
      <Router>
        <Switch>
        <Route
            exact
            path="/hotel/:id"
            render={(props) => {
              return (
                <div>
                  <Hotel {...props}></Hotel>
                  <Footer></Footer>
                </div>
              );
            }}
          ></Route>
          <Route
            exact
            path="/auth/google/account/hotel/:id"
            render={(props) => {
              return (
                <div>
                  <Hotel {...props}></Hotel>
                  <Footer></Footer>
                </div>
              );
            }}
          ></Route>

          <Route exact path="/">
            <Preload isLanding={showLand}></Preload>
            <div className='homepage' onLoad={Landed}>
              <Header LoggedIn={false}></Header>
              <Home></Home>
              <Footer></Footer>
            </div>
          </Route>
          <Route
            exact
            path="/auth/google/account"
            render={(props) => {
              return (
                <div>
                  <Header {...props}></Header>
                  <Home></Home>
                  <Footer></Footer>
                </div>
              );
            }}
          ></Route>
          <Route
            exact
            path="/auth/google/account/search"
            render={(props) => (
              <div>
                <SearchPage {...props}></SearchPage>
                <Footer></Footer>
              </div>
            )}
          ></Route>
          <Route
            exact
            path="/profile"
            render={(profile_props) => <Profile {...profile_props}></Profile>}
          ></Route>
          <Route
            exact
            path="/search"
            render={(props) => (
              <div>
                <SearchPage {...props}></SearchPage>
                <Footer></Footer>
              </div>
            )}
          ></Route>
          <Route exact path="/signup">
            <SignUp type="up"></SignUp>
          </Route>
          <Route exact path="/login">
            <SignUp type="in"></SignUp>
          </Route>
          <Route path='/red'>
            <Redirecting/>
          </Route>
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
