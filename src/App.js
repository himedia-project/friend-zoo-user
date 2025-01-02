// src/App.js
import { Routes, Route } from "react-router-dom";

import Header from "./components/layouts/Header";
import Overlay from "./components/layouts/Overlay";
import Footer from "./components/layouts/Footer";

import HomePage from "./pages/HomePage/HomePage";
import StylePage from "./pages/HomePage/StylePage";
import BestPage from "./pages/HomePage/BestPage";
import NewPage from "./pages/HomePage/NewPage";
import PickPage from "./pages/HomePage/PickPage";
import CategoryPage from "./pages/HomePage/CategoryPage"; // 새로운 CategoryPage 컴포넌트를 import

function App() {
    return (
        <div className="App">

            <Overlay/>
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/style" element={<StylePage />} />
                <Route path="/new" element={<NewPage />} />
                <Route path="/best" element={<BestPage />} />
                <Route path="/pick" element={<PickPage />} />

                {/* 동적 경로 설정 */}
                <Route path="/category" element={<CategoryPage />} /> {/* /category 경로 */}
                <Route path="/category/:categoryName" element={<CategoryPage />} /> {/* /category/:categoryName 경로 */}

                <Route path="*" element={<div>404</div>} />
            </Routes>

            <Footer/>

        </div>
    );
}

export default App;
