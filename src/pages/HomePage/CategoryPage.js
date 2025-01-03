// src/pages/HomePage/CategoryPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Switch, FormControlLabel } from '@mui/material';
import NewItemList from "../../components/post/NewItemList";
import BestItemsList from "../../components/post/BestItemsList";
import PickItemList from "../../components/post/PickItemList";
import StyleItemList from "../../components/post/StyleItemList";

import Dog from "../../pages/category/Dog"; // Dog 컴포넌트 가져오기
import useFetchProducts from "../../hooks/useFetchProducts";
import CategoryButton from "../../components/post/CategoryButton";
import SliderComponent from "../../components/post/MainSlider"; // 카테고리 버튼 컴포넌트 가져오기

const CategoryPage = () => {
    const { categoryName } = useParams();
    const { products } = useFetchProducts(); // 제품 데이터 가져오기
    const [checkedItems, setCheckedItems] = useState({
        NewItemList: false,
        BestItemList: false,
        PickItemList: false,
        StyleItemList: false,
    });

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems(prevState => ({ ...prevState, [name]: checked })); // 스위치 상태 업데이트
    };

    const itemComponents = {
        NewItemList: <NewItemList newItems={products.new} />,
        BestItemList: <BestItemsList bestItems={products.best} />,
        PickItemList: <PickItemList pickItems={products.pick} />,
        StyleItemList: <StyleItemList styleItems={products.style} />,
    };

    return (
        <div>

            <SliderComponent/>

            <h1>{categoryName || "카테고리"}</h1>
            <CategoryButton/>

            {/* /category/dog 경로의 경우 Dog 컴포넌트 표시 */}
            {categoryName === "dog" && <Dog/>}

            {/* /category 경로일 때 BestItemsList 컴포넌트 표시 */}
            {!categoryName && <BestItemsList bestItems={products.best}/>}

            {/* 스위치들 */}
            {Object.keys(checkedItems).map(item => (
                <FormControlLabel
                    key={item}
                    control={
                        <Switch
                            checked={checkedItems[item]}
                            onChange={handleChange}
                            name={item}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    }
                    label={item.replace(/([A-Z])/g, ' $1').trim()} // CamelCase를 띄어쓰기로 변환
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
