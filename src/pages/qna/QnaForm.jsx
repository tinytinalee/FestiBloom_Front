import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/QnaForm.css";

const QnaForm = () => {
  const [boardType, setBoardType] = useState("question");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleTypeSelect = (type) => {
    setBoardType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("boardType", boardType);
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("uploadFile", file);

    try {
      const res = await axios.post("/api/boards", formData, {
        withCredentials: true,
      });
      if (res.ok) navigate(-1);
      else throw new Error("등록에 실패했습니다.");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="board-write-container">
      <form
        className="board-write-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input type="hidden" name="boardType" value={boardType} />

        <label>
          제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          내용:
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>

        <div className="button-group">
          <button type="submit">등록</button>
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default QnaForm;
