import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const ReviewUpdate = () => {
  const { festivalNo, reviewNo } = useParams();
  const navigate = useNavigate();
  const loginId = sessionStorage.getItem("loginId");

  const [review, setReview] = useState({
    reviewTitle: "",
    reviewContent: "",
  });

  useEffect(() => {
    axios.get(`/api/review/detail/${reviewNo}`).then((res) => {
      if (res.data.cMemId !== loginId) {
        alert("수정 권한이 없습니다.");
        navigate(-1);
      } else {
        setReview({
          reviewTitle: res.data.reviewTitle,
          reviewContent: res.data.reviewContent,
        });
      }
    });
  }, [reviewNo, loginId, navigate]);

  const updateInput = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const updateReview = (e) => {
    e.preventDefault();
    axios.put(`/api/review/update/${reviewNo}`, review).then(() => {
      navigate(`/festival/${festivalNo}/review/${reviewNo}`);
    });
  };

  return (
    <>
      <h3>후기 수정</h3>
      <hr />
      <form onSubmit={updateReview}>
        제목:{" "}
        <input
          type="text"
          name="reviewTitle"
          value={review.reviewTitle}
          onChange={updateInput}
        />
        <br />
        내용:
        <br />
        <textarea
          name="reviewContent"
          rows="10"
          cols="80"
          value={review.reviewContent}
          onChange={updateInput}
        ></textarea>
        <br />
        <input type="submit" value="수정" />
        <Link
          to={`/festival/${festivalNo}/review/${reviewNo}`}
          style={{ marginLeft: "10px" }}
        >
          취소
        </Link>
      </form>
    </>
  );
};

export default ReviewUpdate;
