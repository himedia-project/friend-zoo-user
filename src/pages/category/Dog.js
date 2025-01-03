import React from "react";

import useFetchProducts from "../../hooks/useFetchProducts";
import DogItemList from "../../components/post/DogItemList";

function Dog() {
    const { products } = useFetchProducts();

    return (
        <DogItemList pickItems={products.pick} />
    )
}

export default Dog;