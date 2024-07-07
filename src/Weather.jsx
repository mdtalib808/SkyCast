import React, { useState } from "react";
import './Weather.css';

const api = {
  key: "29c06791c336d818e3f8ebc258306d98",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const determineWeatherClass = (temp) => {
    if (temp > 25) return "app warm";
    if (temp > 20 && temp <= 25) return "app spring";
    if (temp > 10 && temp <= 20) return "app winter";
    if (temp <= 0 && temp > 20) return "app cold";
    return "app";
  };

  return (
    <div className={(typeof weather.main != "undefined") ? determineWeatherClass(weather.main.temp) : "app"}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys?.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather"> {weather.weather[0].main}</div>
            </div>
            {(weather.main.temp <= 0) && (
              <div className="winter-details">
                <p>It's freezing outside! Stay warm and dress in layers.</p>
              </div>
            )}
          </div>
        ) : ('')}
      </main>
    </div>
  );
};

export default Weather;
