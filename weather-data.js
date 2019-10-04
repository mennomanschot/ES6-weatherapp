export class WeatherData {
  constructor(cityName, description, weatherIcon, title) {
    this.cityName = cityName;
    this.description = description;
    this.weatherIcon = weatherIcon;
    this.temperature = '';
    this.title = title;
  }
}

// RPOXY for changing raw temp data to right format 
export const WEATHER_PROXY_HANDLER = {
  get: function(target, property) {
    return Reflect.get(target, property);
  },
  set: function(target, property, value) {
    // const newValue = (value * 1.8 + 32).toFixed(1) + ' F.'; to format fahrenheit
    const newValue = value.toFixed(1) + ' C.'; // to format Celsius
    return Reflect.set(target, property, newValue);
  }
};