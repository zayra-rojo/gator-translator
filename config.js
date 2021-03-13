require("dotenv").config();
let config = {
  GOOGLE_TRANSLATE_CREDENTIALS: process.env.GOOGLE_TRANSLATE_CREDENTIALS,
  // PORT: process.env.PORT,
  project_id: process.env.project_id,
};
module.exports = config;
