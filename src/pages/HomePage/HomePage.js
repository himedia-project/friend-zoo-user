// components/HomePage.js
import React, { useEffect, useState } from "react";
import SliderComponent from "../../components/post/MainSlider";
import ItemList from "../../components/post/ItemList";
import CategoryButton from "../../components/post/CategoryButton";
import { getBestItemProductList, getNewItemProductList } from "../../api/productApi"; // API 함수 가져오기

import '../../App.css';

const HomePage = () => {
    const [products, setProducts] = useState({ best: [], new: [], mdpick: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const bestProducts = await getBestItemProductList();
            const newProducts = await getNewItemProductList();
            setProducts({ best: bestProducts, new: newProducts, mdpick: [] });
        } catch (error) {
            console.error('상품 목록 로딩 실패:', error);
            setError(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <SliderComponent/>
            <CategoryButton/>
            <hr/>
            <br/>
            <ItemList title="베스트 상품" items={products.best}/>
            <hr/>
            <br/>
            <ItemList title="신규 상품" items={products.new}/>
            <hr/>
            <br/>
            <ItemList title="추천픽 상품" items={products.mdpick}/>
            <CategoryButton/>
            <SliderComponent/>
        </div>
    );
};

export default HomePage;
