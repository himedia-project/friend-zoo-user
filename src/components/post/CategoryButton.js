import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/CategoryButton.css';

import { getCategoryList } from '../../api/categoryApi';
import { API_SERVER_HOST } from '../../config/apiConfig';

function CategoryButton() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategoryList().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className="category-container">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-item"
          style={{
            backgroundImage: `url(${API_SERVER_HOST}/api/product/view/${category.logo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={() => navigate(`/category/${category.categoryId}`)}
        >
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
}

export default CategoryButton;
