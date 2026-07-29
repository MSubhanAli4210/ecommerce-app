import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import CartItem from "../components/cartItem";
import { fetchCart, clearCart } from "../features/cart/cartSlice";
import { useTheme } from "../context/ThemeContext";
import { createOrderApi } from "../axios/api";
import Loader from "../components/loader";
import { useEffect } from "react";

function Cart() {
  const dispatch = useDispatch();
  const { darkMode } = useTheme();
  const { cartItems, totalQuantity, totalPrice, loading } = useSelector(
    (state) => state.cart
  );

  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handlePlaceOrder = async () => {
    try {
      setPlacing(true);

      await createOrderApi({
        fullName: "Test User",
        addressLine: "123 Main St",
        city: "Lahore",
        postalCode: "54000",
        country: "Pakistan",
      });

      toast.success("Order placed successfully!", { richColors: true });
      dispatch(fetchCart());
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to place order";
      toast.error(message, { richColors: true });
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

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

          <div className="flex gap-3">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Clear Cart
            </button>

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              {placing ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;