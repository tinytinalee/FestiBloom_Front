import { useParams, Routes, Route, Link } from "react-router-dom";
import NoticePage from "./NoticePage";
import ReviewPage from "./ReviewPage";
import QnaPage from "./QnaPage";
import BoothItemList from "./BoothItemList";
import LineupPage from "./LineupPage";
import WeatherPage from "./WeatherPage";
import "./FestivalMainPage.css";

const FestivalMainPage = () => {
  const { festivalNo } = useParams();

  return (
    <div className="festival-main-container">
      <div className="festival-content-box">
        <h2 className="festival-title">페스티벌 상세 페이지</h2>

        {/* 탭 메뉴 */}
        <nav className="tab-menu">
          <Link to="notice">공지사항</Link>
          <Link to="review">후기 게시판</Link>
          <Link to="qna">Q&A</Link>
          <Link to="booth">부스 안내</Link>
          <Link to="lineup">라인업</Link>
          <Link to="weather">날씨 정보</Link>
        </nav>

        {/* 탭 내용 */}
        <div className="tab-content-box">
          <Routes>
            <Route
              path="notice"
              element={<NoticePage festivalNo={festivalNo} />}
            />
            <Route
              path="review"
              element={<ReviewPage festivalNo={festivalNo} />}
            />
            <Route path="qna" element={<QnaPage festivalNo={festivalNo} />} />
            <Route
              path="booth"
              element={<BoothItemList festivalNo={festivalNo} />}
            />
            <Route
              path="lineup"
              element={<LineupPage festivalNo={festivalNo} />}
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
