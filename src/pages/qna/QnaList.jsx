import React from "react";
//import "../css/BoardPage.css";

function QnaList() {
  const questions = [
    {
      id: 1,
      author: "홍길동",
      title: "부스 신청은 어디서 하나요?",
      date: "2025-07-02",
    },
    {
      id: 2,
      author: "김영희",
      title: "입장료는 얼마인가요?",
      date: "2025-07-04",
    },
  ];

  return (
    <div className="wrap">
      <div className="board-container">
        <h1 className="title">QnA 게시판</h1>
        <ul className="post-list">
          {questions.map((post) => (
            <li key={post.id} className="post-item">
              <div className="post-title">{post.title}</div>
              <div className="post-meta">
                <span>{post.author}</span> | <span>{post.date}</span>
              </div>
            </li>
          ))}
        </ul>
        <button className="write-button">질문하기</button>
      </div>
    </div>
  );
}

export default QnaList;
