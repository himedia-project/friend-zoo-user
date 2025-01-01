import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 가져오기
import '../../css/Header.css';

import SearchIcon from '@mui/icons-material/Search';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

function Header() {
    return (
        <header className="header">

            <div className="header-left">
                <Link to="/" className="logo">
                    <img src="https://cdn.imweb.me/thumbnail/20250101/aeebb3fdf2805.jpg" alt="로고" />
                </Link>
                <nav className="menu">
                    <ul>
                        <li><Link to="/best">BEST</Link></li>
                        <li><Link to="/new">NEW</Link></li>
                        <li><Link to="/event">MD's Pick Sale 특가</Link></li>
                    </ul>
                </nav>
            </div>

            <div className="header-right">

                <nav className="menu">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/style">Style</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                    </ul>
                </nav>

                <Link to="/search">
                    <button className="icon"><SearchIcon /></button>
                </Link>
                <Link to="/cart">
                    <button className="icon"><LocalGroceryStoreOutlinedIcon /></button>
                </Link>
                <Link to="/login">
                    <button className="icon"><LoginOutlinedIcon /></button>
                </Link>
            </div>

        </header>
    );
}

export default Header;
