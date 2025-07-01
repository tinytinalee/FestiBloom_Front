import { useState } from "react";
import axios from "axios";
import "../css/join.css";

export default function JoinPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("USER");

  const handleSubmit = (e) => {
    e.preventDefault();

    // role에 따라 요청 경로와 데이터 객체를 다르게 설정
    const url = role === "USER" ? "/api/customer/join" : "/api/business/join";

    const memberData =
      role === "USER"
        ? {
            c_mem_id: id,
            c_mem_pwd: pw,
            c_mem_name: name,
            c_mem_email: email,
            c_mem_phone: phone,
          }
        : {
            b_mem_id: id,
            b_mem_pwd: pw,
            b_mem_name: name,
            b_mem_email: email,
            b_mem_phone: phone,
          };

    axios
      .post(url, memberData)
      .then((res) => {
        alert("회원가입에 성공하였습니다.");
        console.log(res.data);
      })
      .catch((err) => {
        alert(
          "회원가입에 실패하였습니다.: " +
            (err.response?.data?.message || "서버 오류")
        );
        console.error(err);
      });
  };

  return (
    <div className="join-container">
      <h2 className="join-title">회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디==>"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="join-input"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
          className="join-input"
        />
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="join-input"
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="join-input"
        />
        <input
          type="tel"
          placeholder="휴대폰 번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="join-input"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="join-input"
        >
          <option value="USER">사용자</option>
          <option value="ADMIN">관리자</option>
        </select>
        <button type="submit" className="join-button">
          가입하기
        </button>
      </form>
    </div>
  );
}
