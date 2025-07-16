import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/NoticeDetail.css";

const NoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 공지 상세 조회
  //   fetch(`/api/notices/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setNotice(data))
  //     .catch((err) => console.error(err));

  //   // 사용자 정보 조회
  //   fetch("/api/user", { credentials: "include" })
  //     .then((res) => res.json())
  //     .then((data) => setUser(data))
  //     .catch((err) => console.error(err))
  //     .finally(() => setLoading(false));
  // }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 공지 상세 조회
        const noticeResponse = await axios.get(`/api/notices/${id}`);
        setNotice(noticeResponse.data);
      } catch (err) {
        console.error("Failed to fetch notice:", err);
      }

      try {
        // 사용자 정보 조회
        const userResponse = await axios.get("/api/user", {
          withCredentials: true,
        });
        setUser(userResponse.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // const handleDelete = () => {
  //   if (window.confirm("정말 삭제하시겠습니까?")) {
  //     fetch(`/api/notices/${id}`, {
  //       method: "DELETE",
  //       credentials: "include",
  //     })
  //       .then((res) => {
  //         if (res.ok) navigate("/notice");
  //         else throw new Error("삭제에 실패했습니다.");
  //       })
  //       .catch((err) => alert(err.message));
  //   }
  // };
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(`/api/notices/${id}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          navigate("/notice");
        } else {
          throw new Error("삭제에 실패했습니다.");
        }
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!notice) return <p>공지사항을 불러올 수 없습니다.</p>;

  const isAdmin = user?.id === "admin";

  return (
    <div className="notice-detail-container">
      <Header />
      <div className="notice-card">
        <h2>{notice.noticeTitle}</h2>
        <div className="notice-content">
          <p>
            <strong>작성일:</strong>{" "}
            {new Date(notice.noticeCreatedDate).toLocaleDateString()}
          </p>
          <p>
            <strong>내용:</strong>
          </p>
          <div className="content-body">
            {notice.noticeContent.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
        <div className="button-group">
          {isAdmin ? (
            <>
              <button onClick={() => navigate(`/notice/edit/${id}`)}>
                수정
              </button>
              <button onClick={handleDelete}>삭제</button>
            </>
          ) : (
            <div className="not-admin">
              <p>로그인된 ID: {user?.id || "None"}</p>
              <p className="warning">[관리자만 수정/삭제할 수 있습니다]</p>
            </div>
          )}
          <button onClick={() => navigate("/notice")}>목록으로</button>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
