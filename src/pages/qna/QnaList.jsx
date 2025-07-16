import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/QnaList.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const QnaList = () => {
  const [qna, setQna] = useState([]);
  const [loading, setLoading] = useState(true);
  const { festivalNo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/qna/list?festivalNo=${festivalNo}`)
      .then((res) => setList(res.data));
  }, [festivalNo]);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`/qna`)
  //     .then((res) => {
  //       setQna(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  const handleWrite = () => {
    navigate(`/qna/write?type=${type || "question"}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <table className="qna-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>유형</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>파일</th>
          </tr>
        </thead>
        <tbody>
          {qna.length > 0 ? (
            qna.map((q) => (
              <tr key={q.no}>
                <td>{q.no}</td>
                <td>{q.boardType}</td>
                <td>
                  <Link to={`/qna/${q.no}`}>{q.title}</Link>
                </td>
                <td>{q.writer}</td>
                <td>{new Date(q.regdate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">QnA가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="write-btn-container">
        <button className="write-btn" onClick={handleWrite}>
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default QnaList;
