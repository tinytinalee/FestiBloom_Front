import { useParams, Link, Routes, Route } from "react-router-dom";
import NoticePage from "./Notice";
import ReviewPage from "./ReviewList";
import QnaPage from "./Qna";
import BoothPage from "./Booth";
import LineupPage from "./Lineup";
import WeatherPage from "./Weathere";
import "../css/FestivalMainPage.css";

function FestivalMainPage() {
  const { id } = useParams();

  return (
    <div className="festival-container">
      {/* 페스티벌 이름 */}
      <h1 className="festival-title">KOSTA Bloom</h1>

      {/* 탭 메뉴 */}
      <nav className="festival-tabs">
        <Link to="notice">공지사항</Link>
        <Link to="review">후기</Link>
        <Link to="qna">Q&A</Link>
        <Link to="booth">부스 안내</Link>
        <Link to="lineup">라인업</Link>
        <Link to="weather">날씨 정보</Link>
      </nav>

      {/* 중간 정보 영역 */}
      <section className="festival-info">
        <p>
          <strong>장르:</strong> EDM / 인디 / 발라드
        </p>
        <p>
          <strong>기간:</strong> 2025.08.22 ~ 2025.08.25
        </p>
        <p>
          <strong>장소:</strong> 서울 월드컵 경기장
        </p>
        <a
          href="https://ticketlink.example.com"
          className="ticket-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          티켓 예매
        </a>
      </section>

      {/* 포스터 영역 */}
      <section className="festival-poster">
        <img src="/images/poster_sample.png" alt="페스티벌 포스터" />
      </section>

      {/* 설명 영역 */}
      <section className="festival-description">
        <h2>페스티벌 소개</h2>
        <p>
          KOSTA Bloom은 음악, 예술, 자연이 어우러지는 환상적인 여름 축제입니다.
          다채로운 장르와 아티스트 라인업, 맛있는 푸드 부스와 함께 여러분을
          초대합니다!
        </p>
      </section>

      {/* 탭 내용 표시 영역 */}
      <Routes>
        <Route path="notice" element={<NoticePage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="qna" element={<QnaPage />} />
        <Route path="booth" element={<BoothPage />} />
        <Route path="lineup" element={<LineupPage />} />
        <Route path="weather" element={<WeatherPage />} />
      </Routes>
    </div>
  );
}

export default FestivalMainPage;
