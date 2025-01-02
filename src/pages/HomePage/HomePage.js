// components/HomePage.js
import React from "react";
import SliderComponent from "../../components/post/MainSlider";
import BestItemsList from "../../components/post/BestItemsList";
import CategoryButton from "../../components/post/CategoryButton";
import useFetchProducts from "../../hooks/useFetchProducts";
import NewItemList from "../../components/post/NewItemList"; // 커스텀 훅 import

function HomePage() {
    const { products } = useFetchProducts();

    return (
        <div>
            <SliderComponent />
            <CategoryButton />
            <BestItemsList bestItems={products.best} />
            <hr/>
            <NewItemList newItems={products.new} />
        </div>
    );
}

export default HomePage;
