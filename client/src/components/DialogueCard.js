import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import "./styles.css";

const figureStyleGuide = {
  //   width: "100px",
  //   height: "130px",
  borderRadius: "16px",
  marginRight: "24px",
  padding: "20px 40px",
  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
  backgroundColor: "#E69F00",
};
const figureStyleInternational = {
  //   width: "100px",
  //   height: "130px",
  borderRadius: "16px",
  marginRight: "24px",
  padding: "20px 40px",
  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
  backgroundColor: "#7AB3D4",
};
function DialogueCard({ user, content }) {
  return (
    <Figure
      style={
        user == "international" ? figureStyleInternational : figureStyleGuide
      }
    >
      <div>{content}</div>
    </Figure>
  );
}
export default DialogueCard;
