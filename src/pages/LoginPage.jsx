import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "../css/Home.css";
import "../css/LoginPage.css";

function LoginPage() {
  const [userType, setUserType] = useState("customer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 로그인 처리 로직을 추가하세요
    if (userType === "customer") {
      console.log("고객로그인");
      const res = await axios.post("http://localhost:8080/login/customer", {
        username,
        password,
      });
    } else {
      console.log("사업자로그인");
      const res = await axios.post("http://localhost:8080/login/business", {
        username,
        password,
      });
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
