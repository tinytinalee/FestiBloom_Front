import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./LineupList.css";

const LineupList = () => {
  const { festivalNo } = useParams(); // 현재 페스티벌 번호
  const [lineups, setLineups] = useState([]);
  const loginRole = localStorage.getItem("loginRole");

  useEffect(() => {
    const fetchLineups = async () => {
      try {
        const res = await axios.get(`/api/lineup/festival/${festivalNo}`);
        setLineups(res.data);
      } catch (err) {
        console.error("라인업 불러오기 실패:", err);
      }
    };
    fetchLineups();
  }, [festivalNo]);

  const handleDelete = async (castNo) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await axios.delete(`/api/lineup/${castNo}`);
      setLineups(lineups.filter((l) => l.cast_no !== castNo));
    }
  };

  return (
    <div className="lineup-list">
      <h2>라인업</h2>
      {loginRole === "ADMIN" && (
        <Link to={`/lineup/new/${festivalNo}`} className="btn-insert">
          라인업 등록
        </Link>
      )}
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>공연 날짜</th>
            {loginRole === "ADMIN" && <th>관리</th>}
          </tr>
        </thead>
        <tbody>
          {lineups.map((lineup) => (
            <tr key={lineup.cast_no}>
              <td>{lineup.cast_no}</td>
              <td>{lineup.cast_name}</td>
              <td>{lineup.cast_time}</td>
              {loginRole === "ADMIN" && (
                <td>
                  <Link
                    to={`/lineup/edit/${lineup.cast_no}`}
                    className="btn-edit"
                  >
                    수정
                  </Link>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(lineup.cast_no)}
                  >
                    삭제
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LineupList;
