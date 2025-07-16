// src/components/Weather.jsx

import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "aabfb98644f24a73795c6bb095876a8f";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

      try {
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (error) {
        console.error("날씨 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) return <p>날씨 정보를 불러오는 중...</p>;

  return (
    <div style={{ fontFamily: "Binggrae", padding: "0.5rem" }}>
      <h3>{weather.name} 현재 날씨</h3>
      <p>{weather.weather[0].description}</p>
      <p>🌡️ 기온: {weather.main.temp}°C</p>
      <img
        src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt="날씨 아이콘"
      />
    </div>
  );
};

export default Weather;
