import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Scrollbar from "smooth-scrollbar";
import ScrollBar from "react-smooth-scrollbar";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
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
          <Route exact path="/">
            <Header LoggedIn={false}></Header>
            <Home></Home>
            <Footer></Footer>
          </Route>
          <Route exact path="/auth/google/account">
            <Header LoggedIn={true}></Header>
            <Home></Home>
            <Footer></Footer>
          </Route>
          <Route
            exact
            path="/account"
            render={(profile_props) => <Profile {...profile_props}></Profile>}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
