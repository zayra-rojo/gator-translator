import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import "./styles.css";

const figureStyle = {
  width: "500px",
  height: "600px",
  borderRadius: "16px",
  marginRight: "24px",
  padding: "20px 40px",
  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
  backgroundColor: "rgb(209, 230, 224)",
};
function BackgroundCard() {
  return (
    <Figure style={figureStyle}>
      <h2>International Student</h2>
      <h4>Current language: Spanish</h4>
    </Figure>
  );
}
export default BackgroundCard;
