import React, { useEffect, useState } from "react";
import axios from "axios";
import { Howl, Howler } from "howler";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles.css";
import BackgroundCard from "./BackgroundCard";
import audioOutput from "../audiofiles/output.mp3";

function Homepage() {
  const [messageToTranslate, setMessageToTranslate] = useState();
  const [
    translatedMessageInternational,
    setTranslatedMessageInternational,
  ] = useState();
  const [translatedMessageGuide, setTranslatedMessageGuide] = useState();
  // const [languageOfAudio, setLanguageOfAudio] = useState();

  async function handleTranslationRequestInternational(evt) {
    evt.preventDefault();
    console.log("inside Homepage, using axios GET request to api");
    console.log("finally, our messageToTranslate is =", messageToTranslate);
    const translateParams = {
      currentLang: "es",
      targetLang: "en",
      messageToTranslate: messageToTranslate,
    };

    const result = await axios
      .get("http://localhost:8080/translate", { params: translateParams })
      .then((response) => {
        console.log(
          "inside Homepage, inside axios.get.then() callback, printing response..."
        );
        console.log("response.data=", response.data);
        setTranslatedMessageInternational(response.data);
        //setLanguageOfAudio("en-US");
      })
      .catch((error) => {
        console.log("error in axios call! printing error...", error);
      });
  }

  async function handleTranslationRequestGuide(evt) {
    evt.preventDefault();
    console.log("inside Homepage, using axios GET request to api");
    const translateParams = {
      currentLang: "en",
      targetLang: "es",
      messageToTranslate: messageToTranslate,
    };
    console.log("params inside handleTranslationRequestGuide", translateParams);
    const result = await axios
      .get("http://localhost:8080/translate", { params: translateParams })
      .then((response) => {
        console.log(
          "inside Homepage, inside axios.get.then() callback, printing response..."
        );
        console.log("response.data=", response.data);
        setTranslatedMessageGuide(response.data);
      })
      .catch((error) => {
        console.log("error in axios call! printing error...", error);
      });
  }

  function handleOnNewText(evt) {
    setMessageToTranslate(evt.target.value);
  }

  function handleClickedAudioButton() {
    const sound = new Howl({
      src: [audioOutput],
    });
    console.log("inside handleCLickedAudioButton...");

    sound.play();
  }
  //Howler.volume(1.0);

  return (
    <Container fluid>
      <Row>
        <Col>
          <br />
          <BackgroundCard
            user="International"
            onTranslateRequest={handleTranslationRequestInternational}
            onNewText={handleOnNewText}
            translatedTextInternational={translatedMessageInternational}
            translatedTextGuide={translatedMessageGuide}
          />

          <Button onClick={handleClickedAudioButton}>Testing audio...</Button>
        </Col>
        <Col>
          <br />
          <BackgroundCard
            user="Guide"
            onTranslateRequest={handleTranslationRequestGuide}
            onNewText={handleOnNewText}
            translatedTextGuide={translatedMessageGuide}
            translatedTextInternational={translatedMessageInternational}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default Homepage;
