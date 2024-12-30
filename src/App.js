import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/post/HomePage";
import StylePage from "./pages/post/StylePage";

function App() {
    return (
      <div className="App">
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/style" element={<StylePage />} />

          {/* 나머지 404 */}
              <Route path="*" element={<div>404</div>} />
          </Routes>
      </div>
    );
}

export default App;
