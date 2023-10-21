import React, { useState } from "react";
import "./index.css";
import axios from "axios";

import temperature from "./svgs/temperature-three-quarters-solid.svg";
import wind from "./svgs/wind-svgrepo-com.svg";
import droplets from "./svgs/droplet-solid.svg";
import uvindex from "./svgs/sun-solid.svg";
import settings from "./svgs/gear-solid.svg";

import sun from "./svgs/sun-svgrepo-com.svg";
import cloud from "./svgs/cloud-solid.svg";
import thunderstorm from "./svgs/thunderstorm-svgrepo-com.svg";
import drizzle from "./svgs/drizzle-svgrepo-com.svg";
import rain from "./svgs/rain-alt-svgrepo-com.svg";
import snow from "./svgs/snow-alt-1-svgrepo-com.svg";
import clear from "./svgs/sky-svgrepo-com.svg";
import haze from "./svgs/heat-haze-svgrepo-com.svg";
import smoke from "./svgs/smoke4-svgrepo-com.svg";
import mist from "./svgs/mist-svgrepo-com.svg";

function App() {
  const [data, setData] = useState({});
  let [location, setLocation] = useState("");
  let [error, setError] = useState("");

  const [five, setFive] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ecd4a08d04149f1d25675eb7def32d00`;
  const fiveDays = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=ecd4a08d04149f1d25675eb7def32d00`;

  const weatherImages = {
    Clouds: cloud,
    Thunderstorm: thunderstorm,
    Drizzle: drizzle,
    Rain: rain,
    Snow: snow,
    Clear: clear,
    Sun: sun,
    Haze: haze,
    Smoke: smoke,
    Mist: mist,
  };

  const weatherCondition = data.weather && data.weather[0].main;
  const weatherImageSrc = weatherCondition && weatherImages[weatherCondition];

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setError(null);
          console.log(response.status);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setError(error);
            console.log("Error");
          }
        });
      setLocation("");
    }
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input
          id="cityName"
          type="text"
          placeholder="Search City"
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
        />
      </div>

      <div className="right-settings">
        <a href="">
          <img src={settings} alt="" />
        </a>
      </div>

      <div className="no-city">{error ? <p>No city found...</p> : null}</div>

      <div className="main-datas">
        <div className="datas">
          <div className="cdw">
            <h1>
              {data.name ? data.name : "City"}
              {data.sys ? <span>{", " + data.sys.country}</span> : ", Country"}
            </h1>
            <h3>
              {data.main ? (
                <span>{(data.main.temp - 273.15).toFixed(2)} °C</span>
              ) : (
                "temperature"
              )}
            </h3>
            <h5>{data.weather ? data.weather[0].main : "weather"}</h5>
          </div>

          <div className="air-conditions">
            <h1>AIR CONDITIONS</h1>

            <div className="real-feel">
              <img src={temperature} alt="" />
              <ul className="content">
                <li>REAL FEEL</li>
                <li>
                  {data.main ? (
                    <span>{(data.main.feels_like - 273.15).toFixed(2)} °C</span>
                  ) : (
                    "real feel"
                  )}
                </li>
              </ul>
            </div>

            <div className="wind">
              <img src={wind} alt="" />
              <ul className="content">
                <li>WIND</li>
                <li>{data.wind ? data.wind.speed + " km/hr" : "wind"}</li>
              </ul>
            </div>

            <div className="chance-rain">
              <img src={droplets} alt="" />
              <ul className="content">
                <li>CHANCE OF RAIN</li>
                <li>
                  {data.clouds ? data.clouds.all + "%" : "chance of rain"}
                </li>
              </ul>
            </div>

            <div className="uv-index">
              <img src={uvindex} alt="" />
              <ul className="content">
                <li>DESCRIPTION</li>
                <li>
                  {data.weather ? data.weather[0].description : "description"}
                </li>
              </ul>
            </div>

            <div className="weather-symbol">
              {weatherImageSrc && <img src={weatherImageSrc} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
