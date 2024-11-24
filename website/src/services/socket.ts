import { WEBSOCKET_URL } from "@/const";
import io from "socket.io-client";

export const socket = io(WEBSOCKET_URL);
