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
  console.log("target language=", targetLanguage);

  // call google translate api here
  //translateText(messageToTranslate, targetLanguage);
  translateText(messageToTranslate, targetLanguage).then((translatedText) => {
    if (translatedText == 0) return res.sendStatus(404);

    console.log("translated text: ", translatedText);
    convertTextToSpeech(translatedText, targetLanguage);
    console.log("about to return response to api request...!");
    return res.send(translatedText);
  });

  // send translated message back
});

const convertTextToSpeech = async (text, targetLanguage) => {
  console.log("Inside convertTextToSpeech...");
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
  console.log("Audio content written to file: output.mp3");
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
