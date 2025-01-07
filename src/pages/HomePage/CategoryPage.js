import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Switch, FormControlLabel } from '@mui/material';
import SliderComponent from '../../components/post/MainSlider';
import CategoryButton from '../../components/post/CategoryButton';
import CategoryItemList from '../../components/post/CategoryItemList';
import { getCategoryId } from '../../api/productApi';

const CategoryPage = () => {
  const { categoryId } = useParams();

  const [categoryName, setCategoryName] = useState('');
  const [checkedItems, setCheckedItems] = useState({
    'Best 아이템': false,
    'New 아이템': false,
    'MD Pick 아이템': false,
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts(categoryId);
    updateCategoryName(categoryId);
  }, [categoryId]);

  const fetchProducts = async (categoryId) => {
    try {
      const categoryProducts = await getCategoryId(categoryId);
      console.log('categoryProducts: ', categoryProducts);
      setProducts(categoryProducts);
    } catch (error) {
      console.error('상품 목록 로딩 실패:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryName = (categoryId) => {
    switch (categoryId) {
      case '1':
        setCategoryName('🦫 쿼카 카테고리 🍃');
        break;
      case '2':
        setCategoryName('🐕 강아지 카테고리 🐶');
        break;
      case '3':
        setCategoryName('🐊 악어 카테고리 🌴');
        break;
      case '4':
        setCategoryName('🐅 라이언 카테고리 🍖');
        break;
      case '5':
        setCategoryName('🐇 토끼 카테고리 🍀');
        break;
      case '6':
        setCategoryName('🐢 거북이 카테고리 🪵');
        break;
      case '7':
        setCategoryName('🐿️ 다람쥐 카테고리 🌲');
        break;
      case '8':
        setCategoryName('🦦 해달 카테고리 🌊');
        break;
      case '9':
        setCategoryName('🐈 고양이 카테고리 🐾');
        break;
      default:
        setCategoryName('기타 카테고리');
    }
  };


  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevState) => ({ ...prevState, [name]: checked }));
  };

  const itemComponents = {
    2: <CategoryItemList items={products} />,
  };

  return (
    <div>
      <SliderComponent />
      <h1>{categoryName}</h1>
      <CategoryButton />

      {Object.keys(checkedItems).map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Switch
              checked={checkedItems[item]}
              onChange={handleChange}
              name={item}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label={item.replace(/([A-Z])/g, ' $1').trim()}
          labelPlacement="start"
        />
      ))}

      {Object.keys(products).map((item) => itemComponents[item])}
    </div>
  );
};

export default CategoryPage;
