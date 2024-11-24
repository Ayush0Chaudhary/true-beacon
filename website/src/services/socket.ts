import { WEBSOCKET_URL } from "@/const";
import io from "socket.io-client";

export const socket = io(import.meta.env.VITE_WEBSOCKET_URL);
