# Project name
Evaluate a news article with Natural Language Processing

## Instructions
It is a web tool built to analyze the articles found on other websites through Natural Language Processing (NLP); information like Text Polarity, Text Subjectivity and Text Excerpt will be offered. There is a single form input field that accepts user input(URL). If the URL is valid, an api call will be initiated and the result will be displayed on the page; if it is not a valid URL, the error message will pop up. Jest is also used to test the application.

# Run project
The application is run in development and production mode.

Development mode(port 8080): `$ npm run build-dev`;
Production mode(port 3000): `$ npm run build-prod` and the `$ npm run start`

## Configs
There are two webpack config files:
development mode(webpack.config.dev.js);
production mode(webpack.config.prod.js)

### API
The project uses the Text Analysis SDKs from [aylien](https://aylien.com/text-api/), which is an easy-to-use API used to perform a variety of complex NLP tasks on different types of text.

#### Testing
Jest is also used to test the application. To run test, use the command `$ npm run test`. 