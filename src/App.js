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
import Kakao from './components/layouts/Kakao';

import JoinPage from './pages/login/JoinPage';
import LoginPage from './pages/login/LoginPage';

import CartPage from './pages/order/CartPage';

import ProductDetailPage from './pages/HomePage/ProductDetailPage';
import SignInPage from './pages/login/SignInPage';
import MyPage from './pages/My/MyPage';
import OrderHistoryPage from './pages/order/OrderHistoryPage';
import PaymentPage from './pages/order/PaymentPage';
import PayCompletePage from './pages/order/PayCompletePage';
import NotFound from './components/common/NotFound';

function App() {
  return (
    <div className="App">
      <Overlay />
      <Header />

      <Routes>
        {/*좌측*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/style" element={<StylePage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/best" element={<BestPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/pick" element={<PickPage />} />

        {/*메인*/}
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />

        {/*우측*/}
        <Route path="/join" element={<JoinPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/heart" element={<MyPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/complete" element={<PayCompletePage />} />
        <Route path="/order/history" element={<OrderHistoryPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Kakao />
      <Footer />
    </div>
  );
}

export default App;
