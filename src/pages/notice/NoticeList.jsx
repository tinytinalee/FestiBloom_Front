import React from "react";
import "./NoticeList.css";

const notices = [
  { id: 2, title: "2차 라인업", date: "2025-05-12" },
  { id: 1, title: "1차 라인업", date: "2025-05-11" },
];

export default function NoticePage() {
  return (
    <div className="notice-page">
      <div className="notice-container">
        <header className="notice-header">
          <h1>공지사항</h1>
        </header>

        <div className="notice-table-wrapper">
          <table className="notice-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="clickable">{item.title}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
