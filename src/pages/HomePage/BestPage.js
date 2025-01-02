import React from "react";

import BestItemsList from "../../components/post/BestItemsList";
import useFetchProducts from "../../hooks/useFetchProducts";

function BestPage() {

    const { products, loading, error } = useFetchProducts(); // 커스텀 훅 호출

    return (
        <BestItemsList bestItems={products.best} />
    )
}

export default BestPage;