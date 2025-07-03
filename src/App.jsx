//페스티블룸 메인 페이지
//개별 페스티벌 메인 페이지 하나 만드는 중이고 복붙해서 몇 개 더 만들 예정
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FestivalMainPage from "./pages/FestivalMainPage"; // 경로 확인

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/festival/:id/*" element={<FestivalMainPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
