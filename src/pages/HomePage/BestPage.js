import React, {useEffect, useState} from "react";
import ItemListGrid from "../../components/post/ItemListGrid";
import {
    getBestItemProductList,
    getMDPickItemProductList,
    getNewItemProductList,
    getStyleItemProductList,
} from '../../api/productApi';

function BestPage() {

    const [products, setProducts] = useState({ best: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const bestProducts = await getBestItemProductList();

            setProducts({ best: bestProducts });
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