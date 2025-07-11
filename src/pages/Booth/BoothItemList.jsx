import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../css/BoothItemList.css";

const BoothItemList = () => {
  const { id: festivalNo } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    const fetchBoothItems = async () => {
      try {
        const res = await axios.get(`/api/booth-items/${festivalNo}`);
        setItems(res.data);
      } catch (err) {
        console.error("부스 품목을 불러오지 못했습니다:", err);
      }
    };

    fetchBoothItems();
  }, [festivalNo]);

  const handleDelete = async (itemNo) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/booth-items/${itemNo}`);
      setItems(items.filter((item) => item.item_no !== itemNo));
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  return (
    <div className="booth-container">
      <h2 className="booth-title">🎪 부스 품목 목록</h2>

      {isAdmin && (
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <Link to={`/festival/${festivalNo}/booth/add`} className="add-btn">
            + 부스 품목 등록
          </Link>
        </div>
      )}

      {items.length === 0 ? (
        <p>등록된 품목이 없습니다.</p>
      ) : (
        <ul className="booth-list">
          {items.map((item) => (
            <li key={item.item_no} className="booth-item">
              <h3>
                {item.item_name} <span>({item.booth_name})</span>
              </h3>
              <p>{item.item_info}</p>
              <p>💰 가격: {item.item_price.toLocaleString()}원</p>

              {isAdmin && (
                <div className="booth-buttons">
                  <Link
                    to={`/festival/${festivalNo}/booth/edit/${item.item_no}`}
                    className="edit-btn"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => handleDelete(item.item_no)}
                    className="delete-btn"
                  >
                    삭제
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BoothItemList;
