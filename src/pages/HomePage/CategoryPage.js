// src/pages/HomePage/CategoryPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Switch, FormControlLabel } from '@mui/material';
import NewItemList from "../../components/post/NewItemList";
import BestItemsList from "../../components/post/BestItemsList";
import PickItemList from "../../components/post/PickItemList";
import StyleItemList from "../../components/post/StyleItemList";
import useFetchProducts from "../../hooks/useFetchProducts"; // 제품을 가져오는 커스텀 훅

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
            <h1>{categoryName || "Category Page"}</h1>

            {/* 스위치들 */}
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
