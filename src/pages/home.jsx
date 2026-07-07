import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/ThemeContext";
import Loader from "../components/loader";

function Home() {
  const dispatch = useDispatch();
  const { darkMode } = useTheme();
  console.log("Home darkMode:", darkMode);

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className="text-center text-red-500 text-2xl mt-10">{error}</h1>;
  }

  return (
    <div
      className={`min-h-screen p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
