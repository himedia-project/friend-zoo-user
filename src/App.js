// src/App.js
import { Routes, Route } from 'react-router-dom';

import Header from './components/layouts/Header';
import Overlay from './components/layouts/Overlay';
import Footer from './components/layouts/Footer';

import HomePage from './pages/HomePage/HomePage';
import StylePage from './pages/HomePage/StylePage';
import BestPage from './pages/HomePage/BestPage';
import NewPage from './pages/HomePage/NewPage';
import PickPage from './pages/HomePage/PickPage';
import CategoryPage from './pages/HomePage/CategoryPage';
import Kakao from './components/layouts/Kakao'; // 새로운 CategoryPage 컴포넌트를 import
import JoinPage from './pages/login/JoinPage';
import LoginPage from './pages/login/LoginPage';
import MyPage from './pages/login/MyPage';
import CartPage from './pages/order/CartPage';
import OrderPage from './pages/order/OrderPage';
import OrderCompletePage from './pages/order/OrderCompletePage';

function App() {
  return (
    <div className="App">
      <Overlay />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/style" element={<StylePage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/best" element={<BestPage />} />
        <Route path="/pick" element={<PickPage />} />
        {/* 동적 경로 설정 */}
        <Route path="/category" element={<CategoryPage />} />{' '}
        {/* /category 경로 */}
        <Route path="/category/:categoryName" element={<CategoryPage />} />{' '}
        {/* /category/:categoryName 경로 */}
        {/* Kakao 컴포넌트를 특정 경로에만 표시 */}
        <Route
          path="/category"
          element={
            <>
              <CategoryPage />
              <Kakao />
            </>
          }
        />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage" element={<MyPage />} />
        {/* <Route path="/mypage/order" element={<MyPage />} />
                <Route path="/mypage/wish" element={<MyPage />} />
                <Route path="/mypage/info" element={<MyPage />} /> */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order/complete" element={<OrderCompletePage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>

      <Kakao />
      <Footer />
    </div>
  );
}

export default App;
