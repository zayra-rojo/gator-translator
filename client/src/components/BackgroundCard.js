import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import DialogueCard from "./DialogueCard";
import Form from "react-bootstrap/Form";
import "./styles.css";

const figureStyleBackground = {
  width: "570px",
  // height: "600px",
  borderRadius: "16px",
  marginRight: "5px",
  padding: "15px 20px",
  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
  backgroundColor: "rgb(209, 230, 224)",
};
const figureStyleChat = {
  width: "350px",
  // height: "600px",
  borderRadius: "16px",
  marginRight: "24px",
  padding: "10px 20px",
  boxShadow: "5px 5px 5px 5px rgba(208, 216, 243, 0.6)",
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
          <div>{props.user == "International" ? "Guía:" : "You:"}</div>

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

  const handleGoodFeedback = async (evt) => {
    evt.preventDefault();

    let feedbackContent;
    if (props.user == "International")
      feedbackContent = props.translatedTextGuide;
    else if (props.user == "Guide") {
      feedbackContent = props.translatedTextInternational;
    }
    const feedbackParams = {
      userType: props.user,
      feedbackType: "good",
      feedbackContent: feedbackContent,
    };
    console.log("inside handleGoodFeedback, printing params=", feedbackParams);
    const result = await axios
      .post("http://localhost:8080/feedback", { params: feedbackParams })
      .then((response) => {
        console.log("inside handleGoodFeedback...success!");
      })
      .catch((error) => {
        console.log("error inside handleGoodFeedback!!, printing...", error);
      });
  };
  const handleBadFeedback = async (evt) => {
    evt.preventDefault();

    let feedbackContent;
    if (props.user == "International")
      feedbackContent = props.translatedTextGuide;
    else if (props.user == "Guide") {
      feedbackContent = props.translatedTextInternational;
    }
    const feedbackParams = {
      userType: props.user,
      feedbackType: "bad",
      feedbackContent: feedbackContent,
    };
    console.log("inside handleGoodFeedback, printing params=", feedbackParams);
    const result = await axios
      .post("http://localhost:8080/feedback", { params: feedbackParams })
      .then((response) => {
        console.log("inside handleGoodFeedback...success!");
      })
      .catch((error) => {
        console.log("error inside handleGoodFeedback!!, printing...", error);
      });
  };
  return (
    <Figure style={figureStyleBackground}>
      <Container>
        <h3>{props.user} Student</h3>
        <h5>
          Current language:{" "}
          {props.user == "International" ? "Spanish" : "English"}
        </h5>
        <Row>
          <Col>
            <Figure style={figureStyleChat}>{setTextBubbles()}</Figure>
          </Col>
          <Col>
            <div>
              {props.user == "International" ? (
                <div>Escucha tu mensaje traducido: </div>
              ) : (
                <div>Listen to your translated message: </div>
              )}
              <Button
                variant="info"
                onClick={props.onAudioRequest}
                disabled={!props.onAudioAvailable}
              >
                Audio🔊
              </Button>
            </div>
          </Col>
        </Row>
        <div>
          {props.user == "International" ? (
            <h6>Califica la traducción de tu guía:</h6>
          ) : (
            <h6>Rate your guide's translation:</h6>
          )}
          <Row>
            <Col>
              <Button onClick={handleGoodFeedback} variant="success">
                Good
              </Button>
            </Col>
            <Col md={{ span: 9, offset: 0 }}>
              <Button onClick={handleBadFeedback} variant="danger">
                Bad
              </Button>
            </Col>
          </Row>{" "}
        </div>
        <br />
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <h6>
              {props.user == "International"
                ? "Escribe un mensaje:"
                : "Write a message:"}
            </h6>
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
