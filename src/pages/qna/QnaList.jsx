import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../css/QnaList.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const QnaList = () => {
  const [qna, setQna] = useState([]);
  const { festivalNo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(festivalNo);
    axios
      .get(`http://localhost:8080/qna/list/${festivalNo}`)
      .then((res) => setQna(res.data));
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
    navigate(`festival/${festivalNo}/qna/write`);
  };

  return (
    <div>
      <table className="qna-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {qna.length > 0 ? (
            qna.map((q, index) => (
              <tr key={q.qnaNo}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/qna/${q.no}`}>{q.qnaTitle}</Link>
                </td>
                <td>{q.cMemId}</td>
                <td>{new Date(q.qnaCreated).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">QnA가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      {localStorage.getItem("loginState") == "customer" && (
        <div className="write-btn-container">
          <button className="write-btn" onClick={handleWrite}>
            글쓰기
          </button>
        </div>
      )}
      {localStorage.getItem("loginState") == "notLoggedIn" && (
        <div className="login-please">QnA를 작성하려면 로그인하세요.</div>
      )}
    </div>
  );
};

export default QnaList;
