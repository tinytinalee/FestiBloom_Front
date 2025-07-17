import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/NoticeForm.css";

const NoticeForm = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 현재 로그인된 사용자 정보 조회
  //   fetch("/api/user", { credentials: "include" })
  //     .then((res) => res.json())
  //     .then((data) => setUser(data))
  //     .catch((err) => console.error(err))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 현재 로그인된 사용자 정보 조회
        const response = await axios.get("/api/user", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // 공지 등록 요청
  //   fetch("/api/notices", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //     body: JSON.stringify({ title, content }),
  //   })
  //     .then((res) => {
  //       if (res.ok) navigate("/notice");
  //       else throw new Error("공지 등록에 실패했습니다.");
  //     })
  //     .catch((err) => alert(err.message));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 공지 등록 요청
      const response = await axios.post(
        "/api/notices",
        { title, content },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 201 || response.status === 200) {
        navigate("/notice");
      } else {
        throw new Error("공지 등록에 실패했습니다.");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user || user.id !== "admin") {
    return <p style={{ textAlign: "center" }}>접근 권한이 없습니다.</p>;
  }

  return (
    <div className="notice-form-container">
      <Header />
      <h2>📌 공지사항 작성</h2>
      <form className="notice-form" onSubmit={handleSubmit}>
        <label>
          제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          내용:
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>

        <div className="button-group">
          <button type="submit">등록</button>
          <button type="button" onClick={() => navigate("/notice")}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;
