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
    .get(`${apiUrlOc}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
    .then(displayForecast)
    .then(showSunSign);
  axios
    .get(`${apiUrlAirQual}lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(initiateAirQual)
    .then(looksLikeCall);
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
  let humidity = response.data.main.humidity;
  let humidityData = document.querySelector("#humidity");
  humidityData.innerHTML = `${humidity}%`;
  let windspeed = Math.round(response.data.wind.speed);
  let windspeedData = document.querySelector("#windspeed");
  windspeedData.innerHTML = `${windspeed} miles/h`;
  celciusTemperature = Math.round(response.data.main.temp);
  celciusHighLow = `H ${high}°C/L ${low}°C`;
  fahrenheitHighLow = `H ${Math.round((high * 9) / 5 + 32)}°F/L ${Math.round(
    (low * 9) / 5 + 32
  )}°F`;
  looksLikeImgs = response.data.weather[0].main;
}

function looksLikeCall() {
  if (looksLikeImgs === "Ash") {
    document.getElementById("llImg").src = "src/Icons/Ash.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/DustSmokeAshEtc.jpeg');";
  } else if (looksLikeImgs === "Clear") {
    document.getElementById("llImg").src = "src/Icons/Clear.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/Clear.jpeg');";
  } else if (looksLikeImgs === "Clouds") {
    document.getElementById("llImg").src = "src/Icons/Clouds.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/Clouds.jpeg');";
  } else if (looksLikeImgs === "Drizzle") {
    document.getElementById("llImg").src = "src/Icons/Drizzle.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/Rain.jpeg');";
  } else if (looksLikeImgs === "Dust") {
    document.getElementById("llImg").src = "src/Icons/Dust.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/DustSmokeAshEtc.jpeg');";
  } else if (looksLikeImgs === "Fog") {
    document.getElementById("llImg").src = "src/Icons/Fog.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/FogMist.jpeg');";
  } else if (looksLikeImgs === "Haze") {
    document.getElementById("llImg").src = "src/Icons/Haze.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/FogMist.jpeg');";
  } else if (looksLikeImgs === "Mist") {
    document.getElementById("llImg").src = "src/Icons/Mist.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/FogMist.jpeg');";
  } else if (looksLikeImgs === "Rain") {
    document.getElementById("llImg").src = "src/Icons/Rain.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/Rain.jpeg');";
  } else if (looksLikeImgs === "Sand") {
    document.getElementById("llImg").src = "src/Icons/Sand.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/Sand.jpeg');";
  } else if (looksLikeImgs === "Smoke") {
    document.getElementById("llImg").src = "src/Icons/Smoke.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/DustSmokeAshEtc.jpeg');";
  } else if (looksLikeImgs === "Snow") {
    document.getElementById("llImg").src = "src/Icons/Snow.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/Snow.jpeg');";
  } else if (looksLikeImgs === "Squall") {
    document.getElementById("llImg").src = "src/Icons/Squall.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/Snow.jpeg');";
  } else if (looksLikeImgs === "Thunderstorm") {
    document.getElementById("llImg").src = "src/Icons/Thunderstorm.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/Thunderstorm.jpeg');";
  } else if (looksLikeImgs === "Tornado") {
    document.getElementById("llImg").src = "src/Icons/Tornado.png";
    document.getElementById("container").style =
      "background-image: url('src/Backgrounds/Tornado.jpeg');";
  }
}

function initiateOneCall(response) {
  let precip = Math.round(response.data.hourly[0].pop);
  let precipData = document.querySelector("#precip");
  precipData.innerHTML = `${precip * 100}%`;
  let uvIndex = response.data.current.uvi;
  let uvIndexData = document.querySelector("#uvIndex");
  uvIndexData.innerHTML = `${uvIndex}`;
  let moonphase = response.data.daily[0].moon_phase;
  let moonphaseData = document.querySelector("#moonphase");
  if (
    (moonphase >= 0 && moonphase <= 0.0625) ||
    (moonphase >= 0.9376 && moonphase <= 1)
  ) {
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
}

function initiateAirQual(response) {
  let airQual = response.data.list[0].main.aqi;
  let airQualData = document.querySelector("#airQual");
  if (airQual === 1) {
    airQualData.innerHTML = `Very Good`;
  }
  if (airQual === 2) {
    airQualData.innerHTML = `Good`;
  }
  if (airQual === 3) {
    airQualData.innerHTML = `Fair`;
  }
  if (airQual === 4) {
    airQualData.innerHTML = `Poor`;
  }
  if (airQual === 5) {
    airQualData.innerHTML = `Very Poor`;
  }
}

let celciusTemperature = null;
let celciusHighLow = null;
let fahrenheitHighLow = null;
let looksLikeImgs = null;

//Celcius
function changeToCel(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTemp");
  let celCurrent = celciusTemperature;
  celLink.classList.add("active");
  farLink.classList.remove("active");
  celLink.classList.remove("inactive");
  farLink.classList.add("inactive");
  currentTemp.innerHTML = Math.round(celCurrent);
  let highLow = document.querySelector(".highLow");
  highLow.innerHTML = celciusHighLow;
}
let celLink = document.querySelector("#celcius");
celLink.addEventListener("click", changeToCel);

//Fahrenheit
function changeToFar(event) {
  event.preventDefault();
  let farCurrent = (celciusTemperature * 9) / 5 + 32;
  let currentTemp = document.querySelector("#currentTemp");
  farLink.classList.add("active");
  celLink.classList.remove("active");
  farLink.classList.remove("inactive");
  celLink.classList.add("inactive");
  currentTemp.innerHTML = Math.round(farCurrent);
  let highLow = document.querySelector(".highLow");
  highLow.innerHTML = fahrenheitHighLow;
}
let farLink = document.querySelector("#fahrenheit");
farLink.addEventListener("click", changeToFar);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#extendedforecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index >= 0 && index <= 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <span id="forecastDay">${formatDay(forecastDay.dt)}</span><br />
            <span class="forecastImg"><img id="forecastImg" src="src/Icons/${
              forecastDay.weather[0].main
            }.png" /></span>
            <br /><span id="forecastTemp"><span id = "forecastHigh"><strong>${Math.round(
              forecastDay.temp.max
            )}°C</strong></span> / <span id = "forecastLow">${Math.round(
          forecastDay.temp.min
        )}°C</span></span>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Sun Signs
function showSunSign() {
  let sunsignData = document.querySelector("#sunsign");
  {
    if (
      (date >= 21 && months === "March") ||
      (date <= 19 && months === "April")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Aries<span id="sunsignImg"
                  ><img src="src/Zodiacs/Aries.png" /></span
                ></p>`;
    } else if (
      (date >= 20 && months === "April") ||
      (date <= 20 && months === "May")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Taurus<span id="sunsignImg"
                  ><img src="src/Zodiacs/Taurus.png" /></span
                ></p>`;
    } else if (
      (date >= 21 && months === "May") ||
      (date <= 20 && months === "June")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Gemini<span id="sunsignImg"
                  ><img src="src/Zodiacs/Gemini.png" /></span
                ></p>`;
    } else if (
      (date >= 21 && month === "June") ||
      (date <= 22 && months === "July")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Cancer<span id="sunsignImg"
                  ><img src="src/Zodiacs/Cancer.png" /></span
                ></p>`;
    } else if (
      (date >= 23 && months === "July") ||
      (date <= 22 && months === "August")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Leo<span id="sunsignImg"
                  ><img src="src/Zodiacs/Leo.png" /></span
                ></p>`;
    } else if (
      (date >= 23 && months === "August") ||
      (date <= 22 && months === "September")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Virgo<span id="sunsignImg"
                  ><img src="src/Zodiacs/Virgo.png" /></span
                ></p>`;
    } else if (
      (date >= 23 && months === "September") ||
      (date <= 22 && months === "October")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Libra<span id="sunsignImg"
                  ><img src="src/Zodiacs/Libra.png" /></span
                ></p>`;
    } else if (
      (date >= 23 && months === "October") ||
      (date <= 21 && months === "November")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Scorpio<span id="sunsignImg"
                  ><img src="src/Zodiacs/Scorpio.png" /></span
                ></p>`;
    } else if (
      (date >= 22 && months === "November") ||
      (date <= 21 && months === "December")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Sagittarius<span id="sunsignImg"
                  ><img src="src/Zodiacs/Sagittarius.png" /></span
                ></p>`;
    } else if (
      (date >= 22 && months === "December") ||
      (date <= 19 && months === "January")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Capricorn<span id="sunsignImg"
                  ><img src="src/Zodiacs/Capricorn.png" /></span
                ></p>`;
    } else if (
      (date >= 20 && months === "January") ||
      (date <= 18 && months === "February")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Aquarius<span id="sunsignImg"
                  ><img src="src/Zodiacs/Aquarius.png" /></span
                ></p>`;
    } else if (
      (date >= 19 && months === "February") ||
      (date <= 20 && months === "March")
    ) {
      sunsignData.innerHTML = `<p><span id="sunImg"
                  ><img src="src/Icons/Clear.png" />Sun in Pisces<span id="sunsignImg"
                  ><img src="src/Zodiacs/Pisces.png" /></span
                ></p>`;
    }
  }
}
