import React, { createContext, useState } from "react";
import "./App.css";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Book from "./components/Book/Book";
import Contact from "./components/Contact/Contact";
import Blog from "./components/Blog/Blog";
// import NotFound from "./NotFound/NotFound";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header/>
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute path="/book/:riderType">
            <Book/>
          </PrivateRoute>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/contact">
            <Contact/>
          </Route>
          <Route path="/blog">
            <Blog/>
          </Route>
          {/* <Route path="*">
            <NotFound/>
          </Route> */}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
