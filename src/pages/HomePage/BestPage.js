import React, {useEffect, useState} from "react";
import ItemListGrid from "../../components/post/ItemListGrid";
import {getBestItemProductList, getNewItemProductList} from "../../api/productApi";

function BestPage() {

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
        <ItemListGrid title="📌 베스트 상품 🏷️" items={products.best}/>
    )
}

export default BestPage;