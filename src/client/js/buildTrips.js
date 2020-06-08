import { getGeo, getWeather, getPixa } from "./handleRequests";

const getInput = () => {
  const city = document.getElementById("city").value.toLowerCase();
  const startDate = document.getElementById("startDate").value.split("-").join("/");
  const endDate = document.getElementById("endDate").value.split("-").join("/");
  return { city, startDate, endDate };
};

const buildTripInfo = (geoData, weatherData, imagesData) => {
  return {
    city: geoData.geonames[0].toponymName,
    admin: geoData.geonames[0].adminName1,
    country: geoData.geonames[0].countryName,
    population: geoData.geonames[0].population,
    latitude: geoData.geonames[0].lat,
    longitude: geoData.geonames[0].lng,

    weather: weatherData.data[0].weather,
    weather: {
      ...weatherData.data[0].weather,
      temp: weatherData.data[0].temp,
    },

    imageURL: imagesData.hits[0].largeImageURL,
    
    startDate: getInput().startDate,
    endDate: getInput().endDate,
    duration: calculateDuration(),
  };
};

const newTrip = (trip) => {
  document.getElementById("new-trip").style.display = "flex";

  const tripContainer = document.getElementById("new-trip__container");
  tripContainer.textContent = "";
  const newElement = document.createElement("div");
  newElement.innerHTML = `
        <div class="trip-info__container"> 
          <div class="trip-image__container">
            <img class="trip-image" src="${trip.imageURL}" alt="iamge">
          </div>

          <div class="trip-description__container">
            <p> My trip to: ${trip.city}, ${trip.admin}, ${trip.country} </p>
            <p> Local population: ${trip.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <p> Start date: ${trip.startDate}</p>
            <p> End date: ${trip.endDate}</p>
            <p> Trip duration: ${trip.duration} days</p>

            <p>Typical weather for then is:</p>
            <p>${trip.weather.temp.toFixed()}°C, ${trip.weather.description}</p>
            <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${trip.weather.icon}.png" alt="icon">
            <button class="btn" onclick="Client.addTrip()">Save trip</button>
          </div>
        </div>
          `;
  tripContainer.appendChild(newElement);
};


const savedTrips = () => {
  const trips = getLocalTrips();

  const tripsContainer = document.getElementById("trips__container");
  tripsContainer.textContent = "";
  const fragment = document.createDocumentFragment(); 

  for (let trip of trips) {
    const newElement = document.createElement("div");
    newElement.innerHTML = `
    <div class="trip-info__container"> 
    <div class="trip-image__container">
      <img class="trip-image" src="${trip.imageURL}" alt="iamge">
    </div>

    <div class="trip-description__container">
      <p> My trip to: ${trip.city}, ${trip.admin}, ${trip.country} </p>
            <p> Local population: ${trip.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            
            <p> Start date: ${trip.startDate}</p>
            <p> End date: ${trip.endDate}</p>
            <p> Trip duration: ${trip.duration} days</p>
      <p>Typical weather for then is:</p>
      <p>${trip.weather.temp.toFixed()}°C, ${trip.weather.description}</p>
      <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${trip.weather.icon}.png" alt="icon">
      <button id="${trip.id}" class="btn" onclick="Client.removeTrip(event)">Remove trip</button>
    </div>
  </div>
       `;
    fragment.appendChild(newElement);
  }
  tripsContainer.appendChild(fragment); 
};

const requestAPI = async (city) => {
  const geoData = await getGeo(city);

  if (!geoData.totalResultsCount) {
    return alert("Please enter a valid city!");
  }

  let [weatherData, imagesData] = await Promise.all([
    getWeather(city),
    getPixa(city),
  ]);

  if (!imagesData.totalHits) {
    imagesData = await getPixa(geoData.geonames[0].adminName1);
  }

  return { geoData, weatherData, imagesData };
};

// set trips in local storage
const setLocalTrips = (trips) => {
  localStorage.removeItem("trips");
  localStorage.setItem("trips", JSON.stringify(trips));
};

const getLocalTrips = () => {
  return JSON.parse(localStorage.getItem("trips"));
};

const calculateDuration = () => {
  const { startDate, endDate } = getInput();
  const tripStart = new Date(startDate);
  const tripEnd = new Date(endDate);
  return Math.ceil(Math.abs(tripEnd - tripStart) / (1000 * 3600 * 24)+1);
};

export { getInput, buildTripInfo, newTrip, savedTrips, 
requestAPI, setLocalTrips, getLocalTrips, calculateDuration };
