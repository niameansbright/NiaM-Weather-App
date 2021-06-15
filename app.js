//Default
let greeting = document.querySelector("#happyDay");
let timeToday = document.querySelector("#currentTime");
let dateToday = document.querySelector("#todaysDate");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) minutes = "0" + minutes;
if (hours < 10) hours = "0" + hours;
greeting.innerHTML = `Happy ${day}!`;
timeToday.innerHTML = `${hours}:${minutes} EST`;
dateToday.innerHTML = `${day}, ${month} ${date}, ${year}`;

let apiKey = "0186a72d83fe77f4f0abea93bd1ec421";
let units = "metric";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
axios
  .get(`${apiUrl}q=toronto&appid=${apiKey}&units=${units}`)
  .then(showTemperature);

//Current Location
function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0186a72d83fe77f4f0abea93bd1ec421";
  let units = "metric";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
    .then(showTemperature);
  let city = document.querySelector("#cityName");
  city.innerHTML = `Your Location`;
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}
let locate = document.querySelector(".currentLocationOption");
locate.addEventListener("click", getPosition);

//After Search
function displayCity(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#city-input");
  let city = document.querySelector("#cityName");
  city.innerHTML = `${chosenCity.value}`;
  let apiKey = "0186a72d83fe77f4f0abea93bd1ec421";
  let units = "metric";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}q=${chosenCity.value}&appid=${apiKey}&units=${units}`)
    .then(showTemperature);
}
let form = document.querySelector("#cityForm");
document.addEventListener("submit", displayCity);

function showTemperature(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "0186a72d83fe77f4f0abea93bd1ec421";
  let units = "metric";
  let apiUrlOc = "https://api.openweathermap.org/data/2.5/onecall?";
  let apiUrlAirQual = "https://api.openweathermap.org/data/2.5/air_pollution?";
  axios
    .get(`${apiUrlOc}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
    .then(initiateOneCall);
  axios
    .get(`${apiUrlAirQual}lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(initiateAirQual);
  let temperature = Math.round(response.data.main.temp);
  let current = document.querySelector("#currentTemp");
  current.innerHTML = `${temperature}`;
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let highLowTemp = document.querySelector(".highLow");
  highLowTemp.innerHTML = `H ${high}°C/L ${low}°C`;
  let looksLike = response.data.weather[0].main;
  let looksLikeData = document.querySelector("#looksLike");
  looksLikeData.innerHTML = `${looksLike} `;
  if (looksLike === "Ash") {
    document.getElementById("llImg").src = "src/Icons/Ash.png";
  } else if (looksLike === "Clear") {
    document.getElementById("llImg").src = "src/Icons/Clear.png";
  } else if (looksLike === "Clouds") {
    document.getElementById("llImg").src = "src/Icons/Clouds.png";
  } else if (looksLike === "Drizzle") {
    document.getElementById("llImg").src = "src/Icons/Drizzle.png";
  } else if (looksLike === "Dust" || "Sand") {
    document.getElementById("llImg").src = "src/Icons/DustSand.png";
  } else if (looksLike === "Fog" || "Haze") {
    document.getElementById("llImg").src = "src/Icons/FogHaze.png";
  } else if (looksLike === "Mist") {
    document.getElementById("llImg").src = "src/Icons/Mist.png";
  } else if (looksLike === "Rain") {
    document.getElementById("llImg").src = "src/Icons/Rain.png";
  } else if (looksLike === "Smoke") {
    document.getElementById("llImg").src = "src/Icons/Smoke.png";
  } else if (looksLike === "Snow") {
    document.getElementById("llImg").src = "src/Icons/Snow.png";
  } else if (looksLike === "Squall") {
    document.getElementById("llImg").src = "src/Icons/Squall.png";
  } else if (looksLike === "Thunderstorm") {
    document.getElementById("llImg").src = "src/Icons/Thunderstorm.png";
  } else if (looksLike === "Tornado") {
    document.getElementById("llImg").src = "src/Icons/Tornado.png";
  }
  let humidity = response.data.main.humidity;
  let humidityData = document.querySelector("#humidity");
  humidityData.innerHTML = `${humidity}%`;
  let windspeed = Math.round(response.data.wind.speed);
  let windspeedData = document.querySelector("#windspeed");
  windspeedData.innerHTML = `${windspeed} miles/h`;
}

function initiateOneCall(response) {
  let precip = Math.round(response.data.daily[0].pop);
  let precipData = document.querySelector("#precip");
  precipData.innerHTML = `${precip}%`;
  let uvIndex = response.data.current.uvi;
  let uvIndexData = document.querySelector("#uvIndex");
  uvIndexData.innerHTML = `${uvIndex}`;
  let moonphase = response.data.daily[0].moon_phase;
  let moonphaseData = document.querySelector("#moonphase");
  if (moonphase >= 0 && moonphase <= 0.0625) {
    moonphaseData.innerHTML = `New Moon`;
    document.getElementById("moon").src = "src/Moons/New Moon.png";
  }
  if (moonphase >= 0.0626 && moonphase <= 0.1875) {
    moonphaseData.innerHTML = `Waxing Crescent`;
    document.getElementById("moon").src = "src/Moons/Waxing Crescent.png";
  }
  if (moonphase >= 0.1876 && moonphase <= 0.3125) {
    moonphaseData.innerHTML = `First Quarter`;
    document.getElementById("moon").src = "src/Moons/First Quarter.png";
  }
  if (moonphase >= 0.3126 && moonphase <= 0.4375) {
    moonphaseData.innerHTML = `Waxing Gibbous`;
    document.getElementById("moon").src = "src/Moons/Waxing Gibbous.png";
  }
  if (moonphase >= 0.4376 && moonphase <= 0.5625) {
    moonphaseData.innerHTML = `Full Moon`;
    document.getElementById("moon").src = "src/Moons/Full Moon.png";
  }
  if (moonphase >= 0.5626 && moonphase <= 0.6875) {
    moonphaseData.innerHTML = `Waning Gibbous`;
    document.getElementById("moon").src = "src/Moons/Waning Gibbous.png";
  }
  if (moonphase >= 0.6876 && moonphase <= 0.8125) {
    moonphaseData.innerHTML = `Third Quarter`;
    document.getElementById("moon").src = "src/Moons/Third Quarter.png";
  }
  if (moonphase >= 0.8126 && moonphase <= 0.9375) {
    moonphaseData.innerHTML = `Waning Crescent`;
    document.getElementById("moon").src = "src/Moons/Waning Crescent.png";
  }
  if (moonphase >= 0.9376 && moonphase <= 1) {
    moonphaseData.innerHTML = `New Moon`;
    document.getElementById("moon").src = "src/Moons/New Moon.png";
  }
}

function initiateAirQual(response) {
  let airQual = response.data.list[0].main.aqi;
  let airQualData = document.querySelector("#airQual");
  if (airQual === 1) {
    airQualData.innerHTML = `Good`;
  }
  if (airQual === 2) {
    airQualData.innerHTML = `Fair`;
  }
  if (airQual === 3) {
    airQualData.innerHTML = `Moderate`;
  }
  if (airQual === 4) {
    airQualData.innerHTML = `Poor`;
  }
  if (airQual === 5) {
    airQualData.innerHTML = `Very Poor`;
  }
}

//Moon Sign Work In Progress
function showMoonSign(response) {
  let moonsign = response.data.planets[0].name;
  let moonsignData = document.querySelector("#moonsign");
  moonsignData.innerHTML = `${moonsign}`;
}

//Celcius Work In Progress
function changeToCel(response) {
  let chosenCity = document.querySelector("#cityName");
  city.innerHTML = `${chosenCity.value}`;
  let apiKey = "0186a72d83fe77f4f0abea93bd1ec421";
  let units = "metric";
  let apiUrlCel = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrlCel}q=${chosenCity.value}&appid=${apiKey}&units=${units}`)
    .then(initiateOneCall);

  //Celcius Work in Progress
  let celCurrent = Math.round(response.data.main.temp);
  let celCurrentData = document.querySelector("#currentTemp");
  celCurrentData.innerHTML = `${celCurrent}`;
  let celHighLow = document.querySelector(".highLow");
  celHighLow.innerHTML = `H 24°C/L 10°C`;
  let celTempOne = document.querySelector("#firstTemp");
  celTempOne.innerHTML = `19°C`;
  let celTempTwo = document.querySelector("#secondTemp");
  celTempTwo.innerHTML = `19°C`;
  let celTempThree = document.querySelector("#thirdTemp");
  celTempThree.innerHTML = `19°C`;
  let celTempFour = document.querySelector("#fourthTemp");
  celTempFour.innerHTML = `19°C`;
  let celTempFive = document.querySelector("#fifthTemp");
  celTempFive.innerHTML = `19°C`;
  let celTempSix = document.querySelector("#sixthTemp");
  celTempSix.innerHTML = `19°C`;
}
let celLink = document.querySelector("#celcius");
celLink.addEventListener("click", changeToCel);

//Fahrenheit Work In Progress
function changeToFar(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#cityName");
  if (chosenCity === `Toronto`) {
    chosenCity = `toronto`;
  }
  let apiKey = "0186a72d83fe77f4f0abea93bd1ec421";
  let units = "imperial";
  let apiUrlFar = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrlFar}q=${chosenCity.value}&appid=${apiKey}&units=${units}`)
    .then(getFar);
}
let farLink = document.querySelector("#fahrenheit");
farLink.addEventListener("click", changeToFar);

//Fahrenheit Work In Progress
function getFar(response) {
  let farCurrent = Math.round(response.data.main.temp);
  let farCurrentData = document.querySelector("#currentTemp");
  farCurrentData.innerHTML = `${farCurrent}`;
  let farHighLow = document.querySelector(".highLow");
  farHighLow.innerHTML = `H 75°F/L 50°F`;
  let farTempOne = document.querySelector("#firstTemp");
  farTempOne.innerHTML = `66°F`;
  let farTempTwo = document.querySelector("#secondTemp");
  farTempTwo.innerHTML = `66°F`;
  let farTempThree = document.querySelector("#thirdTemp");
  farTempThree.innerHTML = `66°F`;
  let farTempFour = document.querySelector("#fourthTemp");
  farTempFour.innerHTML = `66°F`;
  let farTempFive = document.querySelector("#fifthTemp");
  farTempFive.innerHTML = `66°F`;
  let farTempSix = document.querySelector("#sixthTemp");
  farTempSix.innerHTML = `66°F`;
}
