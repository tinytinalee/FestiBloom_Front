import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/BoothItemForm.css";

const BoothItemForm = () => {
  const { festivalNo, itemNo } = useParams();
  const navigate = useNavigate();
  const isEdit = !!itemNo;

  const [form, setForm] = useState({
    booth_name: "",
    item_name: "",
    item_info: "",
    item_price: "",
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`/api/booth-items/item/${itemNo}`)
        .then((res) => setForm(res.data))
        .catch((err) => console.error("불러오기 실패", err));
    }
  }, [itemNo, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`/api/booth-items/${itemNo}`, {
          ...form,
          festival_no: parseInt(festivalNo),
        });
      } else {
        await axios.post("/api/booth-items", {
          ...form,
          festival_no: parseInt(festivalNo),
        });
      }
      navigate(`/festival/${festivalNo}/booth`);
    } catch (err) {
      console.error("저장 실패", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/booth-items/${itemNo}`);
      navigate(`/festival/${festivalNo}/booth`);
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  return (
    <div className="booth-form-container">
      <h2>{isEdit ? "부스 품목 수정" : "부스 품목 등록"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          부스 이름
          <input
            type="text"
            name="booth_name"
            value={form.booth_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          품목 이름
          <input
            type="text"
            name="item_name"
            value={form.item_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          품목 설명
          <textarea
            name="item_info"
            value={form.item_info}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          가격 (원)
          <input
            type="number"
            name="item_price"
            value={form.item_price}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">{isEdit ? "수정" : "등록"}</button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            style={{
              marginLeft: "10px",
              backgroundColor: "#f66",
              color: "white",
            }}
          >
            삭제
          </button>
        )}
      </form>
    </div>
  );
};

export default BoothItemForm;
