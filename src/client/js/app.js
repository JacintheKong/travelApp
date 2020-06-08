import { getInput, buildTripInfo, newTrip, savedTrips, requestAPI, setLocalTrips } from "./buildTrips";
import { getTrips, postTrip, deleteTrip } from "./handleRequests";

let tripData = {};

const contentLoad = async () => {
  document.addEventListener("DOMContentLoaded", async function () {
    const trips = await getTrips();
    if (trips.length) {
      setLocalTrips(trips);
      savedTrips();
    }
  });
};

const submitForm = async (event) => {
  event.preventDefault();
  const { city, startDate, endDate } = getInput();
  const { geoData, weatherData, imagesData } = await requestAPI(city);
  tripData = buildTripInfo(geoData, weatherData, imagesData);
  newTrip(tripData);
};

const removeTrip = async (event) => {
  event.preventDefault();
  const trips = await deleteTrip(event.target.id);
  setLocalTrips(trips);
  savedTrips();
};

const addTrip = async (event) => {
  const updatedTrips = await postTrip(tripData);
  setLocalTrips(updatedTrips);
  savedTrips();
};

export { submitForm, removeTrip, addTrip, contentLoad };
