import React, {useEffect, useState} from "react";
import ItemListGrid from "../../components/post/ItemListGrid";
import {getBestItemProductList, getNewItemProductList} from "../../api/productApi";
import StyleList from "../../components/post/StyleItemList";

function StylePage() {

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
        // API 호출이 안되서 memberDTO 오류 해결되면 바꿔주기
        // 현재는 best item으로 임시 호출중이며 추가되는대로 위에 useEffect도 수정해야함.
        <StyleList title="🌞 특별상품 🔰" items={products.best}/>
    )
}

export default StylePage;