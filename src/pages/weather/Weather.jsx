// src/components/Weather.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../css/Weather.css";

const Weather = () => {
  const { festivalNo } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/festival/${festivalNo}`
        );
        const koreanCity = res.data.festivalLoc;

        const cityMap = {
          서울: "Seoul",
          부산: "Busan",
          대구: "Daegu",
          인천: "Incheon",
          광주: "Gwangju",
          대전: "Daejeon",
          울산: "Ulsan",
          제주: "Jeju",
        };
        const city = cityMap[koreanCity] || koreanCity;
        setCityName(city);

        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aabfb98644f24a73795c6bb095876a8f&units=metric&lang=kr`
        );

        setWeatherData(weatherRes.data);
      } catch (err) {
        console.error("날씨 정보 불러오는 데 실패했습니다:", err);
        setError("날씨 데이터를 표시할 수 없습니다.");
      }
    };

    fetchWeather();
  }, [festivalNo]);

  return (
    <div className="weather-wrapper">
      <h2>현재 날씨 정보</h2>
      {error && <p className="error">{error}</p>}
      {weatherData ? (
        <div className="weather-box">
          <p>도시: {weatherData.name}</p>
          <p>온도: {weatherData.main.temp}°C</p>
          <p>날씨: {weatherData.weather[0].description}</p>
        </div>
      ) : !error ? (
        <p>날씨 정보를 불러오는 중...</p>
      ) : null}
    </div>
  );
};

export default Weather;
