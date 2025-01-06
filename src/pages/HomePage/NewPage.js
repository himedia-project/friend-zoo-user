import React, {useEffect, useState} from "react";
import ItemListGrid from "../../components/post/ItemListGrid";
import {getBestItemProductList, getNewItemProductList} from "../../api/productApi";

function NewPage() {

    const [products, setProducts] = useState({ categoryId: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const newProducts = await getNewItemProductList();
            setProducts({ new: newProducts });
        } catch (error) {
            console.error('상품 목록 로딩 실패:', error);
            setError(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <ItemListGrid title="🧸 신규 상품 🧩️" items={products.new}/>
    )
}

export default NewPage;