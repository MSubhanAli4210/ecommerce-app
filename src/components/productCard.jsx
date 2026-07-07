import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { useTheme } from "../context/ThemeContext";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { darkMode } = useTheme();

  return (
    <div
      className={`rounded-xl shadow-md hover:shadow-xl transition overflow-hidden ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-52 object-cover"
        />

        <div className="p-5">
          <h2 className="font-bold text-lg truncate">{product.title}</h2>

          <p className="text-gray-500 text-sm mt-2">{product.category}</p>

          <p className="text-xl font-bold text-green-600 mt-3">
            ${product.price}
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-2 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;