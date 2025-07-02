import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};

const ReviewList = () => {
  const { festivalNo } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/review/list?festivalNo=${festivalNo}`)
      .then((res) => setList(res.data));
  }, [festivalNo]);

  return (
    <>
      <h3>후기 목록</h3>
      <hr />
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.reviewNo}>
              <td>{r.reviewNo}</td>
              <td>
                <Link to={`/festival/${festivalNo}/review/${r.reviewNo}`}>
                  {r.reviewTitle}
                </Link>
              </td>
              <td>{r.cMemId}</td>
              <td>{formatDate(r.reviewCreated)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/festival/${festivalNo}/review/write`}>글쓰기</Link>
    </>
  );
};

export default ReviewList;
