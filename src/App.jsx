import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/cart.jsx";
import Navbar from "./components/NavBar.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import ProductDetails from "./pages/productDetail.jsx";

function App() {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "dark bg-gray-900 min-h-screen" : "bg-white min-h-screen"}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;