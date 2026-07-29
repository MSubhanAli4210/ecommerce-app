import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { LogOut, ShoppingCart, Sun, Moon } from "lucide-react";

function Navbar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <NavLink to="/dashboard" className="text-2xl font-bold">
        <h1 className="text-2xl font-bold">ShopEase</h1>
      </NavLink>

      <div className="flex gap-6 items-center">
        <NavLink to="/dashboard">Home</NavLink>
        <NavLink to="/cart" className="flex items-center gap-1">
          <ShoppingCart size={18} />
          ({totalQuantity})
        </NavLink>

        <button
          onClick={toggleTheme}
          className="bg-white text-black p-2 rounded-lg"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {user && (
          <button
            onClick={handleLogout}
            title="Logout"
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;