import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <NavLink to="/">
        <h1 className="text-2xl font-bold">ShopEase</h1>
      </NavLink>

      <div className="flex gap-6 items-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart 🛒 ({totalQuantity})</NavLink>

        <button
          onClick={toggleTheme}
          className="bg-white text-black px-3 py-1 rounded-lg"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;