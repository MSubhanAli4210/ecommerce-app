import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useTheme } from "../context/ThemeContext";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { darkMode } = useTheme();

  const { products } = useSelector((state) => state.products);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Product not found
        </h1>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex dark:bg-gray-800">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 h-80 object-cover"
        />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4">{product.category}</p>
          <p className="text-xl font-bold text-green-600 mb-4">
            ${product.price}
          </p>
          <p className="mb-6">{product.description}</p>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;