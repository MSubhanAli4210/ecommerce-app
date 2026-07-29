import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/home.jsx";
import Cart from "./pages/cart.jsx";
import Navbar from "./components/NavBar.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import ProductDetails from "./pages/productDetail.jsx";
import { AppLogin } from "./pages/appLogin.jsx";
import { AppSignup } from "./pages/appSignup.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/protectedRoutes.jsx";

function App() {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "dark bg-gray-900 min-h-screen" : "bg-white min-h-screen"}>
      <AuthProvider>
        <Toaster richColors position="top-center" />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<AppLogin />} />
            <Route path="/register" element={<AppSignup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;