import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/MySidebar.css';

const MySidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link
            to="/order/history"
            className={`sidebar-link ${
              location.pathname === '/order/history' ? 'active' : ''
            }`}
          >
            주문조회
          </Link>
        </li>
        <li>
          <Link
            to="/heart"
            className={`sidebar-link ${
              location.pathname === '/heart' ? 'active' : ''
            }`}
          >
            찜목록
          </Link>
        </li>
        <li>
          <Link
            // to="/my/edit"
            className={`sidebar-link ${
              location.pathname === '/my/edit' ? 'active' : ''
            }`}
          >
            정보수정
          </Link>
        </li>
        <li>
          <Link
            // to="/my/withdraw"
            className={`sidebar-link ${
              location.pathname === '/my/withdraw' ? 'active' : ''
            }`}
          >
            회원탈퇴
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MySidebar;
