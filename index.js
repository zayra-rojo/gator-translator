const { Translate } = require("@google-cloud/translate").v2;
const express = require("express");
const cors = require("cors")({ origin: true });
const bodyParser = require("body-parser");
const config = require("./config.js");

let app = express();
let port = 8080;
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configure google translate client
const CREDENTIALS = JSON.parse(config.GOOGLE_TRANSLATE_CREDENTIALS);
//console.log(CREDENTIALS);
const projectId = config.project_id;
console.log("checing projectId=", projectId);
const translate = new Translate({
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
    return res.send(translatedText);
  });
  // send translated message back
});

const translateText = async (text, targetLanguage) => {
  try {
    const [translatedText] = await translate.translate(text, targetLanguage);
    //console.log("inside translateText, translatedText=", translatedText);
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
