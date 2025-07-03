import React, { useState, useEffect } from "react";
import "./App.css";

function FestivalCard({ festival }) {
  return (
    <div className="festival-card">
      <div className="poster">포스터</div>
      <div className="festival-info">
        <div className="festival-meta">
          <span>{festival.genre}</span>
          <span>{festival.date}</span>
        </div>
        <div className="festival-details">
          <span>{festival.location}</span>
          <a href={festival.link} target="_blank" rel="noopener noreferrer">
            티켓 구매
          </a>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [festivals, setFestivals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/festivals")
      .then((res) => res.json())
      .then((data) => setFestivals(data))
      .catch((err) => console.error("불러오기 실패:", err));
  }, []);

  const totalPages = Math.ceil(festivals.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentFestivals = festivals.slice(indexOfFirst, indexOfLast);

  const handleSearch = () => {
    console.log("검색:", searchQuery);
  };

  return (
    <div className="home">
      <div className="auth-buttons">
        <button className="auth-button">로그인</button>
        <button className="auth-button">회원가입</button>
      </div>
      <header className="header">
        <h1 className="logo">FestiBloom</h1>
      </header>

      <div className="search-section">
        <div className="filters">
          <select className="filter-select">
            <option value="">카테고리</option>
            <option value="종합 음악">종합 음악</option>
            <option value="록">록</option>
            <option value="밴드/인디">밴드/인디</option>
            <option value="일렉트로니카">일렉트로니카</option>
            <option value="재즈">재즈</option>
            <option value="클래식">클래식</option>
            <option value="힙합">힙합</option>
            <option value="대학축제">대학축제</option>
            <option value="기타 페스티벌">기타 페스티벌</option>
            <option value="북마크">북마크</option>
          </select>
          <select className="filter-select">
            <option value="">지역</option>
            <option value="서울">서울</option>
            <option value="인천">인천</option>
            <option value="대전">대전</option>
            <option value="대구">대구</option>
            <option value="광주">광주</option>
            <option value="부산">부산</option>
            <option value="울산">울산</option>
            <option value="세종">세종</option>
            <option value="경기">경기</option>
            <option value="충북">충북</option>
            <option value="충남">충남</option>
            <option value="경남">경남</option>
            <option value="경북">경북</option>
            <option value="전남">전남</option>
            <option value="전북">전북</option>
            <option value="강원">강원</option>
            <option value="제주">제주</option>
          </select>
          <input className="filter-date" type="date" placeholder="시작일" />
          <span className="tilde">~</span>
          <input className="filter-date" type="date" placeholder="종료일" />
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="페스티벌 이름을 검색해보세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            검색
          </button>
        </div>
      </div>

      <div className="festival-list">
        {currentFestivals.length === 0 ? (
          <div>등록된 페스티벌이 없습니다</div>
        ) : (
          currentFestivals.map((f) => <FestivalCard key={f.id} festival={f} />)
        )}
      </div>

      <div className="pagination">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={currentPage === idx + 1 ? "active" : ""}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
