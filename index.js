const { Translate } = require("@google-cloud/translate").v2;
const textToSpeech = require("@google-cloud/text-to-speech");
const express = require("express");
const cors = require("cors")({ origin: true });
const bodyParser = require("body-parser");

const fs = require("fs");
const util = require("util");

const config = require("./config.js");

let app = express();
let port = 8080;
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configure google translate client
const CREDENTIALS = JSON.parse(config.GOOGLE_TRANSLATE_CREDENTIALS);
//console.log(CREDENTIALS);
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

// configure text-to-speech client
const synthesizeClient = new textToSpeech.TextToSpeechClient({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

app.get("/translate", function (req, res) {
  const currentLanguage = req.query.currentLang;
  const targetLanguage = req.query.targetLang;
  const messageToTranslate = req.query.messageToTranslate;

  // call google translate api here
  //translateText(messageToTranslate, targetLanguage);
  translateText(messageToTranslate, targetLanguage).then((translatedText) => {
    if (translatedText == 0) return res.sendStatus(404);

    convertTextToSpeech(translatedText, targetLanguage);
    return res.send(translatedText);
  });
});

app.get("/feedback", function (req, res) {
  let rawdata = fs.readFileSync(
    "./client/src/translation-feedback/feedback.json"
  );
  let allFeedback = JSON.parse(rawdata);
  console.log("printing all feedback...", allFeedback);
  return res.send(allFeedback);
});

app.post("/feedback", function (req, res) {
  let userType = req.body.params.userType;
  let feedbackType = req.body.params.feedbackType;
  let feedbackContent = req.body.params.feedbackContent;
  console.log(
    "printing all parameters: ",
    userType,
    feedbackType,
    feedbackContent
  );
  let rawData = fs.readFileSync(
    "./client/src/translation-feedback/feedback.json"
  );
  let allFeedback = JSON.parse(rawData);
  if (userType == "International" && feedbackType == "good") {
    allFeedback.internationalStudentFeedback.good.push(feedbackContent);
  } else if (userType == "International" && feedbackType == "bad") {
    allFeedback.internationalStudentFeedback.bad.push(feedbackContent);
  } else if (userType == "Guide" && feedbackType == "good") {
    allFeedback.guideStudentFeedback.good.push(feedbackContent);
  } else if (userType == "Guide" && feedbackType == "bad") {
    allFeedback.guideStudentFeedback.bad.push(feedbackContent);
  }

  fs.writeFileSync(
    "./client/src/translation-feedback/feedback.json",
    JSON.stringify(allFeedback)
  );
  res.sendStatus(200);
});

const convertTextToSpeech = async (text, targetLanguage) => {
  let langCode;
  if (targetLanguage == "en") langCode = "en-US";
  else langCode = "es-ES";
  // construct the request
  const request = {
    input: { text: text },
    voice: { languageCode: langCode, ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  // performs the text-to-speech request
  const [response] = await synthesizeClient.synthesizeSpeech(request);
  // write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(
    "./client/src/audiofiles/output.mp3",
    response.audioContent,
    "binary"
  );
};

const translateText = async (text, targetLanguage) => {
  try {
    const [translatedText] = await translate.translate(text, targetLanguage);
    return translatedText;
  } catch (error) {
    console.log(`Error translating text: ${error}`);
    console.log(error);
    return 0;
  }
};
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
