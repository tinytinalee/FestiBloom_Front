import { BrowserRouter, Routes, Route } from "react-router-dom";
import FestivalMainPage from "./pages/FestivalMainPage"; // 경로 확인
import Home from "./pages/Home";
import JoinPage from "./pages/JoinPage";
import LoginPage from "./pages/LoginPage";
import FestivalForm from "./pages/FestivalForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/festivalform" element={<FestivalForm />} />
        <Route path="/festival/:festivalNo/*" element={<FestivalMainPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
