import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/search/page" component={SearchPage}>
            {/* <h1>{props.pathname}</h1> */}
            {/* <SearchPage></SearchPage> */}
          </Route>
          <Route exact path="/signin">
            <SignIn></SignIn>
          </Route>
          <Route exact path="/">
            <Header></Header>
            <Home></Home>
            <Footer></Footer>
          </Route>
          <Route exact path="/auth/google/account">
            <Header></Header>
            <Home></Home>
            <Footer></Footer>
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
