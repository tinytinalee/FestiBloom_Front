//페스티블룸 메인 페이지
//개별 페스티벌 메인 페이지 하나 만드는 중이고 복붙해서 몇 개 더 만들 예정
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FestivalMainPage from "./pages/FestivalMainPage"; // 경로 확인
import Home from "./pages/Home";
import JoinPage from "./pages/JoinPage";
import LoginPage from "./pages/LoginPage";
import QnaList from "./pages/qna/QnaList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/festival/:id/*" element={<FestivalMainPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/qna" element={<QnaList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
