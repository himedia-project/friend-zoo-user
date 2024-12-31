import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import StylePage from "./pages/HomePage/StylePage";
import BestPage from "./pages/HomePage/BestPage";
import NewPage from "./pages/HomePage/NewPage";

import Header from "./components/layouts/Header";
import Overlay from "./components/layouts/Overlay";

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

              <Route path="/category/dog"/>
              <Route path="/category/cat"/>
              <Route path="/category/quokka"/>
              <Route path="/category/crocodile"/>


              <Route path="*" element={<div>404</div>} />
          </Routes>

      </div>
    );
}

export default App;
