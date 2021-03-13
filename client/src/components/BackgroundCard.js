import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import DialogueCard from "./DialogueCard";
import Form from "react-bootstrap/Form";
import "./styles.css";

const figureStyleBackground = {
  width: "500px",
  // height: "600px",
  borderRadius: "16px",
  marginRight: "24px",
  padding: "20px 40px",
  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
  backgroundColor: "rgb(209, 230, 224)",
};
const figureStyleChat = {
  width: "400px",
  // height: "600px",
  borderRadius: "16px",
  marginRight: "24px",
  padding: "10px 20px",
  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
  backgroundColor: "white",
};
let guideCardContent = "Hi, do you need directions?";
let internationalCardContent = "Yes, how do i get to Chomp It?";

function BackgroundCard(props) {
  const [message, setMessage] = useState();

  const setTextBubbles = () => {
    if (props.user == "International") {
      return (
        <>
          <div>{props.user == "International" ? "Guia:" : "You:"}</div>

          <DialogueCard
            user="Guide"
            content={
              props.translatedTextGuide
                ? props.translatedTextGuide
                : "placeholder"
            }
          />
          <div>
            {props.user == "International" ? "Tu (traducido):" : "You:"}
          </div>
          <DialogueCard
            user="International"
            content={
              props.translatedTextInternational
                ? props.translatedTextInternational
                : "placeholder"
            }
          />
        </>
      );
    } else {
      return (
        <>
          <div>
            {props.user == "International" ? "Guia:" : "International Student:"}
          </div>

          <DialogueCard
            user="Guide"
            content={
              props.translatedTextInternational
                ? props.translatedTextInternational
                : "placeholder"
            }
          />
          <div>
            {props.user == "International"
              ? "Tu (traducido):"
              : "You (translated):"}
          </div>
          <DialogueCard
            user="International"
            content={
              props.translatedTextGuide
                ? props.translatedTextGuide
                : "placeholder"
            }
          />
        </>
      );
    }
  };

  return (
    <Figure style={figureStyleBackground}>
      <Container>
        <h2>{props.user} Student</h2>
        <h4>
          Current language:{" "}
          {props.user == "International" ? "Spanish" : "English"}
        </h4>
        <Figure style={figureStyleChat}>{setTextBubbles()}</Figure>
        {props.user == "International" ? (
          <h5>Escucha tu mensaje traducido: </h5>
        ) : (
          <h5>Listen to your translated message: </h5>
        )}
        <Button
          variant="info"
          onClick={props.onAudioRequest}
          disabled={!props.onAudioAvailable}
        >
          Audio
        </Button>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <h5>
              {props.user == "International"
                ? "Escribe un mensaje:"
                : "Write a message:"}
            </h5>
            <Form.Control as="textarea" rows={3} onChange={props.onNewText} />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={props.onTranslateRequest}
          >
            Send
          </Button>
        </Form>
      </Container>
    </Figure>
  );
}
export default BackgroundCard;
