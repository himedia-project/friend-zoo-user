import React from 'react';
import '../../css/Category.css';

function Category() {
    const categories = [
        { name: '강아지', image: '../../img/dog.png' },
        { name: '고양이', image: '../../img/README.md.png' },
        { name: '쿼카', image: '/path/to/quokka-image.png' },
        { name: '악어', image: '/path/to/crocodile-image.png' },
        { name: '라이언', image: '/path/to/lion-image.png' },
        { name: '토끼', image: '/path/to/rabbit-image.png' },
        { name: '거북이', image: '/path/to/turtle-image.png' },
        { name: '다람쥐', image: '/path/to/squirrel-image.png' },
        { name: '해달', image: '/path/to/otter-image.png' }
    ];

    return (
        <div className="category-container">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className="category-item"
                    style={{ backgroundImage: `url(${category.image})` }}
                >
                    {category.name}
                </div>
            ))}
        </div>
    );
}

export default Category;
