import React, { useState } from "react";
import "../css/FestivalForm.css";

export default function FestivalForm() {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    region: "",
    place: "",
    genre: "",
    price: "",
    image: null,
    description: "",
    link: "",
  });

  const regions = [
    { value: "", label: "지역을 선택하세요" },
    { value: "seoul", label: "서울" },
    { value: "busan", label: "부산" },
    { value: "jeju", label: "제주" },
  ];

  const genres = [
    { value: "", label: "장르를 선택하세요" },
    { value: "music", label: "음악" },
    { value: "art", label: "미술" },
    { value: "food", label: "푸드" },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: 서버 전송 로직
  };

  return (
    <div className="festival-container">
      <form className="festival-form" onSubmit={handleSubmit}>
        <h2>페스티벌 등록</h2>

        <div className="form-group">
          <label>페스티벌 이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>시작일</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>종료일</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>지역</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          >
            {regions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>장소</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="장소를 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label>장르</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            {genres.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>가격</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="예: 무료, 10,000원"
          />
        </div>

        <div className="form-group">
          <label>이미지 업로드</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>설명</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="설명을 입력하세요"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>링크</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://"
          />
        </div>

        <button type="submit" className="submit-btn">
          등록하기
        </button>
      </form>
    </div>
  );
}
