import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

const ParentComponent = () => {
    const handleDataFetched = useCallback((bestData, pickData, newData) => {
        // 데이터를 처리하는 로직
    }, []);

    const memoizedHandleDataFetched = useMemo(() => handleDataFetched, [handleDataFetched]);

    return <DataFetcher onDataFetched={memoizedHandleDataFetched} />;
};

const DataFetcher = ({ onDataFetched }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const [bestResponse, pickItemResponse, newItemResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/product/list?best=Y'), // 베스트 아이템
                    axios.get('http://localhost:8080/api/product/list?other=Y'), // Pick 아이템
                    axios.get('http://localhost:8080/api/product/list?new=Y') // New 아이템
                ]);

                onDataFetched(bestResponse.data, pickItemResponse.data, newItemResponse.data); // 데이터를 부모 컴포넌트로 전달
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [onDataFetched]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return null;
};

export default DataFetcher;
