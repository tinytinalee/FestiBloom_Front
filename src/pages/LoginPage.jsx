import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/LoginPage.css";

function LoginPage() {
  const [userType, setUserType] = useState("customer");
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 로그인 처리 로직을 추가하세요
    console.log(id);
    console.log(pwd);
    if (userType === "customer") {
      console.log("고객로그인");
      const res = await axios.post("http://localhost:8080/login/customer", {
        id,
        pwd,
      });
      console.log(res.data);
      if (res.data == "") {
        alert("아이디와 비밀번호를 다시 확인해주세요.");
      } else {
        localStorage.setItem("loginState", "customer");
        localStorage.setItem("loginId", res.data.cMemId);
        localStorage.setItem("loginName", res.data.cMemName);
        navigate("/");
      }
    } else {
      console.log("사업자로그인");
      const res = await axios.post("http://localhost:8080/login/business", {
        id,
        pwd,
      });
      console.log(res);
      if (res.data == "") {
        alert("아이디와 비밀번호를 다시 확인해주세요.");
      } else {
        localStorage.setItem("loginState", "business");
        localStorage.setItem("loginId", res.data.bMemId);
        localStorage.setItem("loginName", res.data.bMemName);
        navigate("/");
      }
    }
  };

  return (
    <div className="wrap">
      <div className="login-wrapper">
        <h1 className="title">FestiBloom</h1>
        <div className="login-container">
          <div className="login-tabs">
            <button
              className={userType === "customer" ? "active" : ""}
              onClick={() => setUserType("customer")}
            >
              고객 로그인
            </button>
            <button
              className={userType === "business" ? "active" : ""}
              onClick={() => setUserType("business")}
            >
              사업자 로그인
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <button type="submit" className="login-button">
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
