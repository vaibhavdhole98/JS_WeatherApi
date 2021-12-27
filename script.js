// api key:
// c0b75d6e0d5c1c36853bcd676a07967e;


// Selecting Elements

const iconElement = document.querySelector(".weather-icon");
const meterElemnt = document.querySelector(".tempeature-meter p");
const descElement = document.querySelector(".temperature-description");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification ");

// App Data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

// const
const kelvin = 273;
//API key
const key = "c0b75d6e0d5c1c36853bcd676a07967e";

//  check if (API works) the browser support Geolocalization 

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<P>Browser dosen't supoort Geolocalization </p>`
}

// Useer Position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Show error when there is eroor in Geolocalization

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message} </p>`;

}

// API function

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch(api).then(function (response) {
        let data = response.json();
        return data;
    })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// Display to UI

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    meterElemnt.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descElement.innerHTML = `${ weather.description}`;
    locationElement.innerHTML =`${weather.city}, ${weather.country}`;
}



// const iconElement = document.querySelector(".weather-icon img");
// const meterElemnt = document.querySelector(".tempeature-meter p");
// const descElement = document.querySelector(".temperature-description");
// const locationElement = document.querySelector(".location p");
// const notificationElement = document.querySelector(".notification ");
