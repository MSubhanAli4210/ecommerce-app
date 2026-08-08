import { useAuth } from "../context/AuthContext";
import useOrderUpdates from "../hooks/useOrderUpdates";

function OrderStatusListener() {
  const { user } = useAuth();
  useOrderUpdates(user?._id);
  return null;
}

export default OrderStatusListener;