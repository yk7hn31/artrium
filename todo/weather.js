const weather = document.querySelector("#weather");

const COORDS = "coords";
const API = "e16062102e16adcd71e500bea3fb2d37";

function handleGeoError() {
    console.error("ERROR: Unable to Access Geolocation");
    alert("[Alert] Cannot Access to Geolocation. Weather Service won't be serviced Properly.");
}

function getWeather(lat,lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API}&units=metric`).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}°C, ${place}`;
    }).catch(function(error) {
        console.warn(`There was an error somewhere else. Error Log: ${error}`);
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObject = {
        latitude,
        longitude
    };
    saveCoords(coordsObject);
    getWeather(latitude,longitude);
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();