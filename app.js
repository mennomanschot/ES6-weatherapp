import * as ELEMENTS from 'elements.js';
import {Http} from 'http.js';
import {WeatherData, WEATHER_PROXY_HANDLER} from 'weather-data.js';

const APP_ID = '3bf640deef285bfdefa58c514ffd4eaf';
ELEMENTS.ELEMENT_SEARCH_BTN.addEventListener('click', searchWeather);

function searchWeather() {
  const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim().toUpperCase();
  if (CITY_NAME.length == 0) {
    return alert('Please enter something in the form.')
  }
  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';
  
  const URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + CITY_NAME + '&units=metric&appid=' + APP_ID;
  
  Http.fetchData(URL)
    .then(responseData => {
      const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase(), responseData.weather[0].icon, responseData.weather[0].main);
      const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
      WEATHER_PROXY.temperature = responseData.main.temp;
      updateWeather(WEATHER_PROXY);
      console.log(responseData);
    })
    .catch(error => alert(error + '. Are you sure the city name is spelled correctly?'));
}

function updateWeather(weatherData) {
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = (weatherData.title + ' in ' + weatherData.cityName).toUpperCase();
  ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_ICON.src = 'https://openweathermap.org/img/wn/' + weatherData.weatherIcon + '@2x.png';
  ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;
  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
  weatherBoxStyle(weatherData);
  dayNightIcon(weatherData);
  console.log(ELEMENTS.ELEMENT_WEATHER_ICON.src);
}

function dayNightIcon(weatherData) {
  if (weatherData.weatherIcon.includes('n')){
    document.getElementById("nightIcon").style.display = 'block';
    document.getElementById("dayIcon").style.display = 'none';
  } else {
    document.getElementById("dayIcon").style.display = 'block';
    document.getElementById("nightIcon").style.display = 'none';
  }
}

function weatherBoxStyle(weatherData) {
  if (weatherData.title == "Clouds" && weatherData.weatherIcon.includes('n')){
    document.getElementById("weather").style.background = "darkslategray";
    
  }
  else if (weatherData.title == "Clouds" && !weatherData.weatherIcon.includes('n')){
    document.getElementById("weather").style.background = "lightgray";
  }

  else if (weatherData.title == "Drizzle" && weatherData.weatherIcon.includes('n')){
    document.getElementById("weather").style.background = "slategray";
  }
  else if (weatherData.title == "Drizzle" && !weatherData.weatherIcon.includes('n')){
    document.getElementById("weather").style.background = "gainsboro";
  }

  else if (weatherData.title == "Rain" && weatherData.weatherIcon.includes('n')){
    document.getElementById("weather").style.background = "dimgray";
  }
  else if (weatherData.title == "Rain" && !weatherData.weatherIcon.includes('n')){
    document.getElementById("weather").style.background = "darkgray";
  }

  else if (weatherData.title == "Clear" && weatherData.weatherIcon.includes('n')){
    document.getElementById("weather").style.background = "darkblue";
  }
  else if (weatherData.title == "Clear" && !weatherData.weatherIcon.includes('n')){
    document.getElementById("weather").style.background = "dodgerblue";
  }

  else if (weatherData.title == "Fog" && weatherData.weatherIcon.includes('n')){
      document.getElementById("weather").style.background = "#4b2600";
  }
  else if (weatherData.title == "Fog" && !weatherData.weatherIcon.includes('n')){
    document.getElementById("weather").style.background = "rosybrown";
  }

  else {
    console.log('running the else loop');
    document.getElementById("weather").style.background = 'lightblue';
  }
}