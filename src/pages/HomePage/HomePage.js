import React, { useState } from "react";
import SliderComponent from "../../components/post/SliderComponent";
import BestItemsList from "../../components/post/BestItemsList";
import Category from "../../components/post/Category";
import PickItemList from "../../components/post/PickItemList";
import DataFetcher from "../../api/DataFetcher";
import NewItemList from "../../components/post/NewItemList";

function HomePage() {
    const [bestItems, setBestItems] = useState([]);
    const [pickItems, setPickItems] = useState([]);
    const [newItems, setNewItems] = useState([]);

    const handleDataFetched = (best, pick, newI) => {
        setBestItems(best);
        setPickItems(pick);
        setNewItems(newI);
    };

    return (
        <div>
            <DataFetcher onDataFetched={handleDataFetched} />
            <SliderComponent />
            <Category />
            <BestItemsList bestItems={bestItems} />
            <PickItemList pickItems={pickItems} />
            <NewItemList newItems={newItems} />
        </div>
    );
}

export default HomePage;
