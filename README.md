# Instructions for setting up Gator-Translator

Clone this repository
Run `npm i`

## APIs

This project uses the Google Cloud Translate and Google Text-to-Speech APIs
Both use the same service account.
To add your service account:

1. Create a .env file in the root directory (not /client)
2. Create a new environment variable called GOOGLE_TRANSLATE_CREDENTIALS and set it to the contents of the service account json (remove indentation as necessary so it's all in one line)

### `npm start`

Runs the frontend part of the app in the development mode.

1. Navegate to /client directory
2. Run `npm start`
   Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `npm run server`

Runs the node.js server

1. navegate to root directory
2. Run `npm run server`
