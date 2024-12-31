import React from "react";

const BestItemsList = ({ bestItems }) => {
    if (!bestItems || bestItems.length === 0) return <div>상품이 없습니다.</div>;

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            <h2>베스트 상품</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {bestItems.map((item) => (
                    <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '200px' }}>
                        <img src={item.photo} alt={item.name} style={{ width: '100%', height: 'auto' }} />
                        <h3>{item.name}</h3>
                        <p>{item.price} 원</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestItemsList;
