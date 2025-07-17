import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Weather from "./Weather";

const WeatherPage = () => {
  const { festivalNo } = useParams();

  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchFestivalInfo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/festival/${festivalNo}`
        );
        setCity(res.data.festivalLoc);
      } catch (error) {
        console.error("축제 정보 로딩 실패:", error);
      }
    };

    fetchFestivalInfo();
  }, [festivalNo]);

  if (!city) return <p>도시 정보를 불러오는 중...</p>;

  return (
    <div className="weather-page" style={{ padding: "0.5rem 2rem 2rem 2rem" }}>
      {/* ❌ <h2>현재 날씨 정보</h2> 제거 */}
      <Weather city={city} />
    </div>
  );
};

export default WeatherPage;
