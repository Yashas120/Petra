import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Hotel from "./components/Product";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import ScrollBar from "react-smooth-scrollbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header LoggedIn={false}></Header>
            <Home></Home>
            <Footer></Footer>
          </Route>
          <Route
            exact
            path="/auth/google/account"
            render={(props) => {
              return (
                <div>
                  <Header
                    LoggedIn={props.location.props.LoggedIn}
                    {...props}
                  ></Header>
                  <Home></Home>
                  <Footer></Footer>
                </div>
              );
            }}
          ></Route>
          <Route
            exact
            path="/auth/google/account/searchPage"
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
          <Route exact path="/hotel">
            <Hotel id="123"></Hotel>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
