import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Category.css';
import dogImage from '../../img/dog.png';
import catImage from '../../img/cat.png';
import qukkaImage from '../../img/qukka.png';
import crocodileImage from '../../img/crocodile.png';
import lionImage from '../../img/lion.png';
import rabbitImage from '../../img/rabbit.png';
import turtleImage from '../../img/turtle.png';
import squirrelImage from '../../img/squirrel.png';
import otterImage from '../../img/otter.png';

function CategoryButton() {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const categories = [
        { name: 'dog', image: dogImage },
        { name: '고양이', image: catImage },
        { name: '쿼카', image: qukkaImage },
        { name: '악어', image: crocodileImage },
        { name: '라이언', image: lionImage },
        { name: '토끼', image: rabbitImage },
        { name: '거북이', image: turtleImage },
        { name: '다람쥐', image: squirrelImage },
        { name: '해달', image: otterImage }
    ];

    return (
        <div className="category-container">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className="category-item"
                    style={{
                        backgroundImage: `url(${category.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onClick={() => navigate(`/category/${category.name}`)} // 클릭 시 이동
                >
                    <span>{category.name}</span>
                </div>
            ))}
        </div>
    );
}

export default CategoryButton;
