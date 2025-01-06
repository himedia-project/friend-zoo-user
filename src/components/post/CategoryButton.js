import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/CategoryButton.css';
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
        { name: '강아지', url: '2', image: dogImage },
        { name: '고양이', url: '9', image: catImage },
        { name: '쿼카', url: '1', image: qukkaImage },
        { name: '악어', url: '3', image: crocodileImage },
        { name: '라이언', url: '4', image: lionImage },
        { name: '토끼', url: '5', image: rabbitImage },
        { name: '거북이', url: '6', image: turtleImage },
        { name: '다람쥐', url: '7', image: squirrelImage },
        { name: '해달', url: '8', image: otterImage }
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
                    onClick={() => navigate(`/category/${category.url}`)}
                >
                    <span>{category.name}</span>
                </div>
            ))}
        </div>
    );
}

export default CategoryButton;
