// hooks/useFetchProducts.js
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

function useFetchProducts() {
    const [products, setProducts] = useState({ best: [], pick: [], new: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect( () => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const bestResponse = await axiosInstance.get("/product/list?best=Y"); // 베스트

                setProducts({
                    best: bestResponse.data,
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // 빈 배열로 한 번만 호출

    return { products, loading, error };
}

export default useFetchProducts;