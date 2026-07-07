import CartItem from "../components/cartItem";
import { clearCart } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";

function Cart() {
  const dispatch = useDispatch();
  const { darkMode } = useTheme();
  const { cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);

  if (cartItems.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <h1 className="text-2xl font-bold text-gray-500">
          Your cart is empty
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
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        <div
          className={`rounded-xl shadow-md p-6 flex justify-between items-center mt-6 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <div>
            <p className="text-gray-500">Total Items: {totalQuantity}</p>
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;