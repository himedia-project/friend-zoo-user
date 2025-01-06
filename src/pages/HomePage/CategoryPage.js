import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Switch, FormControlLabel } from '@mui/material';
import SliderComponent from '../../components/post/MainSlider';
import CategoryButton from '../../components/post/CategoryButton';
import CategoryItemList from '../../components/post/CategoryItemList';
import { getCategoryId } from '../../api/productApi';

const categoryTitles = {
  강아지: '강아지 카테고리',
  고양이: '고양이 카테고리',
  쿼카: '쿼카 카테고리',
};

const CategoryPage = () => {
  const { categoryId, categoryName } = useParams();
  console.log('categoryId: ', categoryId);
  console.log('categoryName: ', categoryName);

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
      <h1>{categoryTitles[categoryName] || '카테고리'}</h1>
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
