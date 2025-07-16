import { useParams, Link, Routes, Route } from "react-router-dom";
import NoticeList from "./notice/NoticeList";
import ReviewList from "./review/ReviewList";
import QnaList from "./qna/QnaList";
import BoothItemList from "./booth/BoothItemList";
import LineupList from "./lineup/LineupList";
import WeatherPage from "./weather/WeatherPage";
import "../css/FestivalMainPage.css";

const FestivalMainPage = () => {
  const { festivalNo } = useParams();

  return (
    <div className="festival-main-container">
      <div className="festival-content-box">
        <h2 className="festival-title">페스티벌 상세 페이지</h2>

        <nav className="tab-menu">
          <Link to="notice">공지사항</Link>
          <Link to="review">후기 게시판</Link>
          <Link to="qna">Q&A</Link>
          <Link to="booth">부스 안내</Link>
          <Link to="lineup">라인업</Link>
          <Link to="weather">날씨 정보</Link>
        </nav>

        <div className="tab-content-box">
          <Routes>
            <Route
              path="notice"
              element={<NoticeList festivalNo={festivalNo} />}
            />
            <Route
              path="review"
              element={<ReviewList festivalNo={festivalNo} />}
            />
            <Route path="qna" element={<QnaList festivalNo={festivalNo} />} />
            <Route
              path="booth"
              element={<BoothItemList festivalNo={festivalNo} />}
            />
            <Route
              path="lineup"
              element={<LineupList festivalNo={festivalNo} />}
            />
            <Route
              path="weather"
              element={<WeatherPage festivalNo={festivalNo} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default FestivalMainPage;
