import { useState } from "react";
import axios from "axios";
import "../css/JoinPage.css";

const JoinPage = () => {
  const [form, setForm] = useState({
    cMemId: "",
    cMemPwd: "",
    cMemName: "",
    cMemPhone: "",
    cMemEmail: "",
    role: "USER",
  });

  const [idMessage, setIdMessage] = useState("");
  const [idAvailable, setIdAvailable] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "cMemId") {
      setIdMessage("");
      setIdAvailable(null);
    }
  };

  const checkDuplicateId = async () => {
    const idParam = form.role === "ADMIN" ? "bMemId" : "cMemId";
    const idValue = form.cMemId;

    const url =
      form.role === "ADMIN"
        ? `http://localhost:8080/api/business/check-id?${idParam}=${idValue}`
        : `http://localhost:8080/api/customer/check-id?${idParam}=${idValue}`;

    try {
      const res = await axios.get(url);
      if (res.data) {
        setIdMessage("이미 사용 중인 ID입니다.");
        setIdAvailable(false);
      } else {
        setIdMessage("사용 가능한 ID입니다.");
        setIdAvailable(true);
      }
    } catch (err) {
      setIdMessage("ID 중복 확인 실패");
      setIdAvailable(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      form.role === "ADMIN"
        ? "http://localhost:8080/api/business/join"
        : "http://localhost:8080/api/customer/join";

    const { role, ...baseForm } = form;

    const memberData =
      role === "ADMIN"
        ? {
            bMemId: baseForm.cMemId,
            bMemPwd: baseForm.cMemPwd,
            bMemName: baseForm.cMemName,
            bMemPhone: baseForm.cMemPhone,
            bMemEmail: baseForm.cMemEmail,
          }
        : {
            cMemId: baseForm.cMemId,
            cMemPwd: baseForm.cMemPwd,
            cMemName: baseForm.cMemName,
            cMemPhone: baseForm.cMemPhone,
            cMemEmail: baseForm.cMemEmail,
          };

    try {
      await axios.post(url, memberData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("회원가입 완료");
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="join-container">
      <h2>회원 가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="cMemId">아이디:</label>
          <input
            type="text"
            name="cMemId"
            value={form.cMemId}
            onChange={handleChange}
          />
          <button type="button" onClick={checkDuplicateId}>
            중복 확인
          </button>
          {idMessage && (
            <div
              style={{
                marginTop: "6px",
                fontSize: "14px",
                color: idAvailable ? "green" : "red",
              }}
            >
              {idMessage}
            </div>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="cMemPwd">비밀번호:</label>
          <input
            type="password"
            name="cMemPwd"
            value={form.cMemPwd}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="cMemName">이름:</label>
          <input
            type="text"
            name="cMemName"
            value={form.cMemName}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="cMemPhone">전화번호:</label>
          <input
            type="text"
            name="cMemPhone"
            value={form.cMemPhone}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="cMemEmail">이메일:</label>
          <input
            type="text"
            name="cMemEmail"
            value={form.cMemEmail}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="role">회원유형:</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="USER">사용자</option>
            <option value="ADMIN">관리자</option>
          </select>
        </div>

        <div className="form-submit">
          <button type="submit">가입하기</button>
        </div>
      </form>
    </div>
  );
};

export default JoinPage;
