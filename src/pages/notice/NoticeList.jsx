import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../css/NoticeList.css";
import axios from "axios";

const NoticeList = () => {
  const { festivalNo } = useParams();
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    console.log(festivalNo);
    axios
      // .get(`/api/review/list?festivalNo=${festivalNo}`)
      .get(`http://localhost:8080/notice/list/${festivalNo}`)
      .then((res) => setNotice(res.data));
  }, [festivalNo]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // 현재 로그인된 사용자 정보 조회
  //       const userResponse = await axios.get("/user", {
  //         withCredentials: true,
  //       });
  //       setUser(userResponse.data);
  //     } catch (err) {
  //       console.error("Failed to fetch user:", err);
  //     }

  //     try {
  //       // 공지 목록 조회
  //       const noticeResponse = await axios.get("/notice");
  //       setNotice(noticeResponse.data);
  //     } catch (err) {
  //       console.error("Failed to fetch notices:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   // 현재 로그인된 사용자 정보 조회
  //   fetch("/user", { credentials: "include" })
  //     .then((res) => res.json())
  //     .then((data) => setUser(data))
  //     .catch((err) => console.error(err));

  //   // 공지 목록 조회
  //   fetch("/notice")
  //     .then((res) => res.json())
  //     .then((data) => setNotices(data))
  //     .catch((err) => console.error(err))
  //     .finally(() => setLoading(false));
  // }, []);

  return (
    <div className="notice-container">
      <h2>공지사항</h2>

      {localStorage.getItem("loginState") == "business" && (
        <div className="write-area">
          <Link to="/notice/form" className="write-button">
            공지 쓰기
          </Link>
        </div>
      )}

      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {notice.length > 0 ? (
            notice.map((n, index) => (
              <tr key={n.noticeNo}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/notice/${n.noticeNo}`} className="title-link">
                    {n.noticeTitle}
                  </Link>
                </td>
                <td>{new Date(n.noticeCreated).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">공지사항이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeList;
