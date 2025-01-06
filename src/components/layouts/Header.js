import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logoutPost } from '../../api/loginApi';
import { logout } from '../../redux/loginSlice';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import useCustomLogin from '../../hooks/useCustomLogin';
import Swal from 'sweetalert2'; // SweetAlert2 임포트

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.loginSlice);
  const { handleAuthError, requireAuth } = useCustomLogin();

  const handleProtectedAction = (path) => {
    if (requireAuth(email)) {
      navigate(path);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutPost();
      dispatch(logout());
      Swal.fire({
        title: '로그아웃 성공',
        text: '로그아웃 되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      if (!handleAuthError(error)) {
        Swal.fire({
          title: '로그아웃 실패',
          text: '로그아웃에 실패했습니다.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src={logo} alt="로고" />
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
            </ul>
          </nav>
          <Link to="/search">
            <button className="icon">
              <SearchIcon />
            </button>
          </Link>
          <button
            className="icon"
            onClick={() => handleProtectedAction('/heart')}
          >
            <FavoriteOutlinedIcon />
          </button>
          <button
            className="icon"
            onClick={() => handleProtectedAction('/cart')}
          >
            <LocalGroceryStoreOutlinedIcon />
          </button>
          {email ? (
            <button className="icon" onClick={handleLogout}>
              <AccountCircleIcon />
            </button>
          ) : (
            <Link to="/login">
              <button className="icon">
                <AccountCircleIcon />
              </button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
