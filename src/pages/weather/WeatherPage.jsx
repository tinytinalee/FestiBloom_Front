// src/pages/WeatherPage.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Weather from "./Weather";

const WeatherPage = () => {
  const { id: festivalNo } = useParams();
  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchFestivalInfo = async () => {
      try {
        const res = await axios.get(`/api/festival/${festivalNo}`);
        setCity(res.data.festival_loc); // ERD 기준 festival_loc 사용
      } catch (error) {
        console.error("축제 정보 로딩 실패:", error);
      }
    };

    fetchFestivalInfo();
  }, [festivalNo]);

  if (!city) return <p>도시 정보를 불러오는 중...</p>;

  return (
    <div className="weather-page" style={{ padding: "1rem" }}>
      <h2>현재 날씨 정보</h2>
      <Weather city={city} />
    </div>
  );
};

export default WeatherPage;
