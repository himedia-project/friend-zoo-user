import React from "react";

import useFetchProducts from "../../hooks/useFetchProducts";
import NewItemList from "../../components/post/NewItemList";
import Loding from "../../components/post/Loding";
import PickItemList from "../../components/post/PickItemList";

function PickPage() {
    const { products } = useFetchProducts(); // 커스텀 훅 호출

    return (
        <PickItemList pickItems={products.pick} />
    )
}

export default PickPage;