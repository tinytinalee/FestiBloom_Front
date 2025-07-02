import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const ReviewForm = () => {
  const { festivalNo } = useParams();
  const navigate = useNavigate();
  const loginId = sessionStorage.getItem("loginId");

  const [review, setReview] = useState({
    reviewTitle: "",
    reviewContent: "",
  });

  const updateInput = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const saveReview = (e) => {
    e.preventDefault();
    const data = {
      ...review,
      cMemId: loginId,
      festivalNo,
    };
    axios.post("/api/review/write", data).then(() => {
      navigate(`/festival/${festivalNo}/review`);
    });
  };

  return (
    <>
      <h3>후기 작성</h3>
      <hr />
      <form onSubmit={saveReview}>
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
        <input type="submit" value="등록" />
        <Link
          to={`/festival/${festivalNo}/review`}
          style={{ marginLeft: "10px" }}
        >
          취소
        </Link>
      </form>
    </>
  );
};

export default ReviewForm;
