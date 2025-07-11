import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./LineupForm.css";

const LineupForm = () => {
  const { castNo } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cast_name: "",
    cast_info: "",
    cast_time: "",
    festival_no: "",
  });

  useEffect(() => {
    if (castNo) {
      const fetchData = async () => {
        const res = await axios.get(`/api/lineup/${castNo}`);
        setForm(res.data);
      };
      fetchData();
    }
  }, [castNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (castNo) {
      await axios.put(`/api/lineup/${castNo}`, form);
    } else {
      await axios.post("/api/lineup", form);
    }
    navigate("/lineup");
  };

  return (
    <div className="lineup-form">
      <h2>{castNo ? "라인업 수정" : "라인업 등록"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cast_name"
          placeholder="출연자 이름"
          value={form.cast_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cast_info"
          placeholder="소개"
          value={form.cast_info}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cast_time"
          placeholder="공연 시간"
          value={form.cast_time}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="festival_no"
          placeholder="페스티벌 번호"
          value={form.festival_no}
          onChange={handleChange}
          required
        />
        <button type="submit">{castNo ? "수정하기" : "등록하기"}</button>
      </form>
    </div>
  );
};

export default LineupForm;
