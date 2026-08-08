import { useEffect, useState } from "react";
import { socket } from "../socket";
import { toast } from "sonner";

function useOrderUpdates(userId) {
  const [liveStatus, setLiveStatus] = useState({});

  useEffect(() => {
    if (!userId) return;

    socket.connect();
    socket.emit("join", userId);

    socket.on("orderStatusUpdated", ({ orderId, status }) => {
      setLiveStatus((prev) => ({ ...prev, [orderId]: status }));
      toast.success(`Order status updated: ${status}`);
    });

    return () => {
      socket.off("orderStatusUpdated");
      socket.disconnect();
    };
  }, [userId]);

  return liveStatus;
}

export default useOrderUpdates;