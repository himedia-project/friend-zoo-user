import React, { useEffect, useState } from "react";

import axios from "axios";
import SliderComponent from "../../components/post/SliderComponent";
import BestItemsList from "../../components/post/BestItemsList";
import Category from "../../components/post/Category";

function HomePage() {
    const [bestItems, setBestItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBestItems = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/product/list?best=Y');
                setBestItems(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBestItems();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <SliderComponent />
            <Category />
            <BestItemsList bestItems={bestItems} />
        </div>
    );
}

export default HomePage;
