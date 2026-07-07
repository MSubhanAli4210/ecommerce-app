import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h2 className="font-bold">{item.title}</h2>
          <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="font-bold text-green-600">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => dispatch(removeFromCart(item))}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;