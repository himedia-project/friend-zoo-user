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
        { name: '강아지', url: 'dog', image: dogImage },
        { name: '고양이', url: 'cat', image: catImage },
        { name: '쿼카', url: 'qukka', image: qukkaImage },
        { name: '악어', url: 'crocodile', image: crocodileImage },
        { name: '라이언', url: 'ryan', image: lionImage },
        { name: '토끼', url: 'rabbit', image: rabbitImage },
        { name: '거북이', url: 'turtle', image: turtleImage },
        { name: '다람쥐', url: 'squirrel', image: squirrelImage },
        { name: '수달', url: 'otter', image: otterImage }
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
