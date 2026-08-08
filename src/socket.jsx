import { io } from "socket.io-client";
import { serverUrl } from "./axios/config";

export const socket = io(serverUrl, {
  autoConnect: false,
});