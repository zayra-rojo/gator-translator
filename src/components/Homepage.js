import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles.css";
import BackgroundCard from "./BackgroundCard";

function Homepage() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <br />
          <BackgroundCard />
        </Col>
        <Col>
          <Button>UF Guide Student</Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Homepage;
