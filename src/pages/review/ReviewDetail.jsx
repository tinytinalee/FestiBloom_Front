import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};

const ReviewDetail = () => {
  const { festivalNo, reviewNo } = useParams();
  const [review, setReview] = useState({});
  const navigate = useNavigate();
  const loginId = sessionStorage.getItem("loginId");

  useEffect(() => {
    axios.get(`/api/review/detail/${reviewNo}`).then((res) => {
      setReview(res.data);
    });
  }, [reviewNo]);

  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios.delete(`/api/review/delete/${reviewNo}`).then(() => {
        navigate(`/festival/${festivalNo}/review`);
      });
    }
  };

  return (
    <>
      <h3>후기 상세</h3>
      <hr />
      번호 : <span>{review.reviewNo}</span>
      <br />
      제목 : <span>{review.reviewTitle}</span>
      <br />
      작성자 : <span>{review.cMemId}</span>
      <br />
      작성일 : <span>{formatDate(review.reviewCreated)}</span>
      <br />
      내용 :<br />
      <textarea
        rows="10"
        cols="80"
        readOnly
        value={review.reviewContent}
      ></textarea>
      <br />
      {loginId === review.cMemId && (
        <>
          <Link to={`/festival/${festivalNo}/review/update/${review.reviewNo}`}>
            수정
          </Link>{" "}
          <button onClick={handleDelete}>삭제</button>
        </>
      )}
      <br />
      <Link to={`/festival/${festivalNo}/review`}>목록</Link>
    </>
  );
};

export default ReviewDetail;
