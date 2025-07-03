import { useState } from "react";
import axios from "axios";
import "../css/JoinPage.css";

function JoinPage() {
  const [formData, setFormData] = useState({
    cMemId: "",
    cMemPwd: "",
    cMemName: "",
  });

  const [checkIdMsg, setCheckIdMsg] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 아이디가 바뀌면 중복확인 상태 초기화
    if (name === "cMemId") {
      setIsIdAvailable(null);
      setCheckIdMsg("");
    }
  };

  const handleCheckId = async () => {
    const trimmedId = formData.cMemId.trim();

    if (!trimmedId) {
      setCheckIdMsg("아이디를 입력하세요.");
      setIsIdAvailable(null);
      return;
    }

    try {
      const response = await axios.get(
        `/api/customer/check-id?cMemId=${trimmedId}`
      );
      if (response.data.available) {
        setIsIdAvailable(true);
        setCheckIdMsg("사용 가능한 아이디입니다.");
      } else {
        setIsIdAvailable(false);
        setCheckIdMsg("이미 사용 중인 아이디입니다.");
      }
    } catch (error) {
      console.error("중복 확인 오류:", error);
      setIsIdAvailable(null);
      setCheckIdMsg("중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isIdAvailable !== true) {
      setCheckIdMsg("아이디 중복 확인을 완료해주세요.");
      return;
    }

    try {
      const res = await axios.post("/api/customer/join", formData);
      alert("회원가입이 완료되었습니다.");
      // redirect 또는 form 초기화
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="cMemId"
            placeholder="아이디"
            value={formData.cMemId}
            onChange={handleChange}
          />
          <button type="button" onClick={handleCheckId}>
            중복 확인
          </button>
        </div>
        <p style={{ color: isIdAvailable === false ? "red" : "green" }}>
          {checkIdMsg}
        </p>

        <div>
          <input
            type="password"
            name="cMemPwd"
            placeholder="비밀번호"
            value={formData.cMemPwd}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="cMemName"
            placeholder="이름"
            value={formData.cMemName}
            onChange={handleChange}
          />
        </div>

        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default JoinPage;
