import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/QnaDetail.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const QnaDetail = () => {
  const { festivalNo, qnaNo } = useParams();
  const [qna, setQna] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const loginId = sessionStorage.getItem("loginId");

  // useEffect(() => {
  //   fetch(`/api/boards/${no}`)
  //     .then((res) => res.json())
  //     .then((data) => setBoard(data))
  //     .catch((err) => console.error(err));

  //   fetch("/api/user", { credentials: "include" })
  //     .then((res) => res.json())
  //     .then((data) => setUser(data))
  //     .catch((err) => console.error(err))
  //     .finally(() => setLoading(false));
  // }, [no]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 게시판 상세 조회
        const boardRes = await axios.get(`/api/boards/${no}`);
        setBoard(boardRes.data);
      } catch (err) {
        console.error("Failed to fetch board:", err);
      }

      try {
        // 사용자 정보 조회
        const userRes = await axios.get("/api/user", {
          withCredentials: true,
        });
        setUser(userRes.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [no]);

  useEffect(() => {
    axios.get(`/qna/detail/${qnaNo}`).then((res) => {
      setQna(res.data);
    });
  }, [qnaNo]);

  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios.delete(`/qna/delete/${qnaNo}`).then(() => {
        navigate(`/festival/${festivalNo}/qna`);
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!board) return <p>게시글을 불러올 수 없습니다.</p>;

  const isOwner = user?.id === board.writer;
  const isReview = board.boardType === "review";

  return (
    <div className="board-detail-container">
      <Header />
      <div className="detail-card">
        <h2>{isReview ? "후기 상세보기" : "질문 상세보기"}</h2>

        <div className="label">제목</div>
        <div className="content-box">{qna.qnaTitle}</div>

        <div className="label">작성자</div>
        <div className="content-box">{qna.cMemId}</div>

        <div className="label">작성일</div>
        <div className="content-box">
          {new Date(qna.qnaCreated).toLocaleDateString()}
        </div>

        <div className="label">내용</div>
        <div className="content-box pre-line">{qna.qnaContent}</div>

        <div className="comment-box">답변</div>

        <div className="btn-group">
          <br />
          {loginId === review.cMemId && (
            <>
              <Link
                to={`/festival/${festivalNo}/review/update/${review.reviewNo}`}
              >
                수정
              </Link>{" "}
              <button onClick={handleDelete}>삭제</button>
            </>
          )}
          <br />
          <Link to={`/festival/${festivalNo}/review`}>목록</Link>
          <button
            className="back"
            onClick={() => navigate(`/festival/${festivalNo}/qna`)}
          >
            목록으로
          </button>
          {isOwner && (
            <>
              <button
                className="edit"
                onClick={() =>
                  navigate(`/board/edit/${no}?type=${board.boardType}`)
                }
              >
                수정
              </button>
              <button
                className="delete"
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    fetch(`/api/boards/${no}`, {
                      method: "DELETE",
                      credentials: "include",
                    })
                      .then((res) => {
                        if (res.ok) navigate(`/festival/${festivalNo}/qna`);
                        else throw new Error("삭제에 실패했습니다.");
                      })
                      .catch((err) => alert(err.message));
                  }
                }}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QnaDetail;
