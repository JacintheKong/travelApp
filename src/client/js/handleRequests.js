//URL and username for Geonames
const geonamesURL = "http://api.geonames.org/searchJSON?q="
const geonamesUsername = "jacinthekong";

//URL and API Key for WeatherBit
const weatherbitURL = "https://api.weatherbit.io/v2.0/current?city=";
const weatherbitAPIKey = "71f89c7d2da2431690cd96d283ae64a6";

//URL and API Key for Pixabay
const pixabayURL = "https://pixabay.com/api/";
const pixabayAPIKey = "16381428-07c8946efbb13d344b4dca4e1";

const baseURL = "http://localhost:8000";

const getGeo = async (city) => {
  if (!city) alert("Please enter a valid city!");
  try {
    const res = await fetch(`${geonamesURL}${city}&maxRows=10&username=${geonamesUsername}`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const getWeather = async (city) => {
  if (!city) alert("Please enter a valid city!");
  try {
    const res = await fetch(`${weatherbitURL}${city}&key=${weatherbitAPIKey}`);
    if (res) return res.json();
  } catch (error) {
    console.error(error);
  }
};

const getPixa = async (city) => {
  try {
    let res = await fetch(`${pixabayURL}?key=${pixabayAPIKey}&q=${city}&image_type=photo`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const getTrips = async () => {
  try {
    const trips = await fetch(`${baseURL}/trips`);
    return trips.json();
  } catch (error) {
    console.error(error);
  }
};

const postTrip = async (trip) => {
  try {
    const trips = await fetch(`${baseURL}/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trip }),
    });
    return trips.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteTrip = async (tripId) => {
  try {
    const trips = await fetch(`${baseURL}/trips/${tripId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return trips.json();
  } catch (error) {
    console.error(error);
  }
};

export { getGeo, getWeather, getPixa, getTrips, postTrip, deleteTrip };
