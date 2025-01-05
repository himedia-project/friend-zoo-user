import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link 컴포넌트 가져오기
import '../../css/Header.css';

import SearchIcon from '@mui/icons-material/Search';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import logo from '../../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logoutPost } from '../../api/loginApi';
import { logout } from '../../redux/loginSlice';
import AlertModal from '../common/AlertModal';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.loginSlice);
  const [alertModal, setAlertModal] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: false,
  });

  const handleLogout = async () => {
    try {
      await logoutPost();
      dispatch(logout());
      setAlertModal({
        open: true,
        title: '로그아웃 성공',
        message: '로그아웃 되었습니다.',
        isSuccess: true,
        onSuccess: () => {
          navigate('/login');
        },
      });
    } catch (error) {
      console.error('로그아웃 실패:', error);
      setAlertModal({
        open: true,
        title: '로그아웃 실패',
        message: '로그아웃에 실패했습니다.',
        isSuccess: false,
      });
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src={logo} alt="로고" /> {/* 경로로 로고 이미지 표시 */}
          </Link>
          <nav className="menu">
            <ul>
              <li>
                <Link to="/best">BEST</Link>
              </li>
              <li>
                <Link to="/new">NEW</Link>
              </li>
              <li>
                <Link to="/category">Category</Link>
              </li>
              <li>
                <Link to="/pick">MD's Pick Sale 특가</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-right">
          <nav className="menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/style">Style</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
            </ul>
          </nav>
          <Link to="/search">
            <button className="icon">
              <SearchIcon />
            </button>
          </Link>
          <Link to="/cart">
            <button className="icon">
              <LocalGroceryStoreOutlinedIcon />
            </button>
          </Link>
          {email ? (
            <button className="icon" onClick={handleLogout}>
              <LogoutOutlinedIcon />
            </button>
          ) : (
            <Link to="/login">
              <button className="icon">
                <LoginOutlinedIcon />
              </button>
            </Link>
          )}
        </div>
      </header>

      <AlertModal
        open={alertModal.open}
        onClose={() => {
          setAlertModal({ ...alertModal, open: false });
          alertModal.onSuccess?.();
        }}
        title={alertModal.title}
        message={alertModal.message}
        isSuccess={alertModal.isSuccess}
      />
    </>
  );
}

export default Header;
