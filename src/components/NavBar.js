import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import Homepage from "./Homepage.js";
import FeedbackPage from "./FeedbackPage.js";
import { Nav } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";

function NavBar() {
  return (
    <Container fluid>
      <Router>
        <Navbar bg="light" expand="lg">
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
    </Container>
  );
}
export default NavBar;
