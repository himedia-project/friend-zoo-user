// src/pages/HomePage/CategoryPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Switch, FormControlLabel } from '@mui/material';
import BestItemsList from "../../components/post/ItemList";
import CategoryButton from "../../components/post/CategoryButton";
import SliderComponent from "../../components/post/MainSlider";
import ItemList from "../../components/post/ItemList";

const categoryTitles = {
    dog: "강아지 카테고리",
    cat: "고양이 카테고리",
    quokka: "쿼카 카테고리",
};

const CategoryPage = () => {

    const { categoryId } = useParams(); // URL에서 categoryId 가져오기

    const { categoryName } = useParams();

    const [checkedItems, setCheckedItems] = useState({
        ItemList: false,
        Dog: false,
    });

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems(prevState => ({ ...prevState, [name]: checked })); // 스위치 상태 업데이트
    };

    // 체크된 항목에 대한 컴포넌트 매핑
    const itemComponents = {
        // ItemList: <BestItemsList title={`${categoryTitles[categoryName]} 상품`} items={products[categoryName]} />,
        // 여기에 더 많은 항목을 추가할 수 있습니다.
    };

    return (
        <div>
            <SliderComponent />
            <h1>{categoryTitles[categoryName] || "카테고리"}</h1>
            <CategoryButton />

            {/* 체크박스들 */}
            {Object.keys(checkedItems).map(item => (
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

            {/* 체크된 항목에 따라 컴포넌트 표시 */}
            {Object.keys(checkedItems).map(item => (
                checkedItems[item] && itemComponents[item]
            ))}
        </div>
    );
};

export default CategoryPage;
