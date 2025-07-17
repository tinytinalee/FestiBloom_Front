import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../css/NoticeList.css";
import axios from "axios";

const NoticeList = () => {
  const { id: festivalNo } = useParams();
  const [user, setUser] = useState(null);
  const [notice, setNotice] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 현재 로그인된 사용자 정보 조회
        const userResponse = await axios.get("/user", {
          withCredentials: true,
        });
        setUser(userResponse.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }

      try {
        // 공지 목록 조회
        const noticeResponse = await axios.get("/notice");
        setNotices(noticeResponse.data);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="notice-container">
      <h2>공지사항</h2>

      {user?.id === "business" && (
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
          {notices.length > 0 ? (
            notices.map((n) => (
              <tr key={n.noticeNo}>
                <td>{n.noticeNo}</td>
                <td>
                  <Link to={`/notice/${n.noticeNo}`} className="title-link">
                    {n.noticeTitle}
                  </Link>
                </td>
                <td>{new Date(n.noticeCreatedDate).toLocaleDateString()}</td>
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
