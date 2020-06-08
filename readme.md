# Project name
Travel App

## Instructions
It is a travel application built to offer information about the city that you are traveling to. It includes a simple form to enter the location and the traveling dates. Data is retrieved from from 3 APIs in which one of those is reliant on another to work. If the input is valid, the api call will be initiated and the image, geo info and weather of the city will be displayed on the page; if it is not a valid city, the error message will pop up. Jest is used to test the application.

# Run project
The application is run in development and production mode.
First, `$ npm install`
Development mode(port 8080): `$ npm run build-dev`;
Production mode(port 8000): `$ npm run build-prod` and `$ npm start`

## Configs
There are two webpack config files:
development mode(webpack.config.dev.js);
production mode(webpack.config.prod.js)

### API
The project uses geonamesUsername from [geonames](http://api.geonames.org/) to get the latitude, longitude, and country info, weatherbitAPIKey from [weatherbit](https://www.weatherbit.io/api) to get weather info, and pixabayAPIKey from [pixabay](https://pixabay.com/api/) to get relevant image of the city.

#### Testing
Jest is also used to test the application. To run test, use the command `$ npm run test`. 

If there is no response, please enter Shift while refreshing the page.