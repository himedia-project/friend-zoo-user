import React from "react";

import useFetchProducts from "../../hooks/useFetchProducts";
import NewItemList from "../../components/post/NewItemList";

function NewPage() {

    const { products, loading, error } = useFetchProducts(); // 커스텀 훅 호출

    return (
        <NewItemList newItems={products.new} />
    )
}

export default NewPage;