import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import Homepage from "./Homepage.js";
import FeedbackPage from "./FeedbackPage.js";
import { Nav } from "react-bootstrap";

function NavBar() {
  return (
    <Router>
      <Navbar className="color-nav" expand="lg">
        <Navbar.Brand href="/">Gator-Translator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/feedback">Feedback</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/feedback">
          <FeedbackPage />
        </Route>
      </Switch>
    </Router>
  );
}
export default NavBar;
