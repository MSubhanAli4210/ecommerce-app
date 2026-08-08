import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { getMyOrdersApi, cancelOrderApi } from "../axios/api";
import { socket } from "../socket";
import Loader from "../components/loader";
import { toast } from "sonner";

function Orders() {
  const { darkMode } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrdersApi();
      setOrders(res.data.orders);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const handleUpdate = ({ orderId, status }) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
    };

    socket.on("orderStatusUpdated", handleUpdate);
    return () => socket.off("orderStatusUpdated", handleUpdate);
  }, []);

  const handleCancel = async (orderId) => {
    try {
      setCancellingId(orderId);
      const res = await cancelOrderApi(orderId);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.data.order : o))
      );
      toast.success("Order cancelled");
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to cancel order";
      toast.error(message);
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return <Loader />;

  const statusColors = {
    pending: "bg-yellow-500",
    paid: "bg-blue-500",
    shipped: "bg-purple-500",
    delivered: "bg-green-600",
    cancelled: "bg-red-600",
  };

  return (
    <div className={`min-h-screen p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <h1 className="text-4xl font-bold text-center mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {orders.map((order) => (
            <div key={order._id} className={`rounded-xl shadow-md p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                <span className={`text-white text-sm px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-2">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <ul className="text-sm mb-2">
                {order.items.map((item) => (
                  <li key={item.product}>
                    {item.title} × {item.quantity} — ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <p className="font-bold">Total: ${order.totalPrice.toFixed(2)}</p>

                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    disabled={cancellingId === order._id}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                  >
                    {cancellingId === order._id ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;